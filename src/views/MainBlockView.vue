<template>
	<TheHeader :isNameShown="isNameShown" />
	<main class="main">
		<h1 class="main__title" aria-label="Nagłówek H1">Nagłówek H1</h1>
		<hr class="main__separator" />
		<div class="main__content">
			<BlockOne v-model="selectedOption" />
			<BlockTwo @replace="replaceQuote" @add="addQuote" />
			<BlockThree :quotes="quoteObjects" @deleteQuote="deleteQuote" @updateQuote="updateQuote" />
		</div>
	</main>
	<TheFooter @resetSettings="resetSettings" @showInfo="showInfo" />
</template>

<script setup lang="ts">
import TheHeader from '../components/layout/TheHeader.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import BlockOne from '@/components/BlockOne.vue'
import BlockTwo from '@/components/BlockTwo.vue'
import BlockThree from '@/components/BlockThree.vue'
import database from '../../data.json'
import { Options, type Quote } from '@/types/OptionsType'
import { useToast } from 'vue-toastification'
import { computed, ref, watch, onMounted } from 'vue'

const toast = useToast()
const db = database

const selectedOption = ref<string>('')

const addedQuotes = ref<Array<Quote>>([])

const quoteObjects = computed<Quote[]>(() => {
	return addedQuotes.value.map((item: Quote) => ({ id: item.id, quote: item.quote }))
})

const updateLocalStorage = () => {
	localStorage.setItem('quotes', JSON.stringify(addedQuotes.value))
}

watch(addedQuotes, updateLocalStorage, { deep: true })

const replaceQuote = () => {
	switch (selectedOption.value) {
		case Options.FIRST:
			addedQuotes.value = [db[0]]
			break
		case Options.SECOND:
			addedQuotes.value = [db[1]]
			break
		case Options.THIRD:
			const remainingQuotes = db.slice(2)
			const randomIndex = Math.floor(Math.random() * remainingQuotes.length)
			addedQuotes.value = [remainingQuotes[randomIndex]]
			break
		default:
			toast.error('Musisz wybrać którąś z dostępnych opcji w pierwszym bloku!')
			break
	}
	updateLocalStorage()
}

const addQuote = () => {
	if (!selectedOption.value) {
		toast.error('Musisz wybrać którąś z dostępnych opcji w pierwszym bloku!')
		return
	}

	const unusedQuotes = db.filter(item => !addedQuotes.value.some(added => added.id === item.id))

	if (unusedQuotes.length === 0) {
		toast.error(`Nie możesz dodać więcej cytatów, bo wszystkie zostały już wykorzystane.`)
		return
	}

	const filteredQuotes = unusedQuotes.filter(item => {
		if (selectedOption.value === Options.FIRST) {
			return item.id === 1
		} else if (selectedOption.value === Options.SECOND) {
			return item.id === 2
		} else {
			return true
		}
	})

	if (filteredQuotes.length === 0) {
		toast.error(`Ten cytat został już dodany.`)
		return
	}

	const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
	const newQuote = filteredQuotes[randomIndex]

	if (addedQuotes.value.some(item => item.id === newQuote.id)) {
		toast.error(`Ten cytat z id ${newQuote.id} został już dodany.`)
	} else {
		addedQuotes.value.push(newQuote)
		updateLocalStorage()
	}
}

const deleteQuote = (id: number) => {
	addedQuotes.value = addedQuotes.value.filter((quote: Quote) => quote.id !== id)
	updateLocalStorage()
}

const updateQuote = ({ id, quote }: Quote) => {
	const quoteIndex = addedQuotes.value.findIndex((quote: Quote) => quote.id === id)
	if (quoteIndex !== -1) {
		addedQuotes.value[quoteIndex].quote = quote
		updateLocalStorage()
	}
}

const reset = ref<boolean>(false)
const resetSettings = () => {
	reset.value = true
	isNameShown.value = false
	selectedOption.value = ''
	addedQuotes.value = []

	localStorage.removeItem('quotes')
}

const isNameShown = ref<boolean>(false)
const showInfo = () => {
	isNameShown.value = true
}

onMounted(() => {
	const storedQuotes = localStorage.getItem('quotes')
	if (storedQuotes) {
		try {
			addedQuotes.value = JSON.parse(storedQuotes)
		} catch (error) {
			console.error('Error while getting quotes from local storage.', error)
		}
	}
})
</script>

<style lang="scss" scoped>
.main {
	margin-top: 1rem;
	padding: 1rem;

	&__title {
		text-align: center;
		font-weight: normal;
		margin-bottom: 1rem;
	}

	&__separator {
		margin: 0 auto;
		width: 160px;
	}

	&__content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 4rem;
	}
}

@media (min-width: 960px) {
	.main__content {
		padding: 1rem 0;
	}
}

@media (min-width: 1024px) {
	.main__content {
		padding: 1rem 2rem;
	}
}
</style>
