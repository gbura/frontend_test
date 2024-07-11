<template>
	<TheHeader :isNameShown="isNameShown" />
	<main class="main">
		<h1 class="main__title">Nagłówek H1</h1>
		<hr />
		<div class="main__content">
			<BlockOne v-model="selectedOption" />
			<BlockTwo @replace="replaceQuote" @add="addQuote" />
			<BlockThree :quotes="quoteTexts" />
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
import { computed, ref } from 'vue'

const toast = useToast()
const db = database

const selectedOption = ref<string>('')

const addedQuotes = ref<Array<Quote>>([])

const quoteTexts = computed<string[]>(() => {
	return addedQuotes.value.map((item: Quote) => item.quote)
})

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
			break
	}
}

const addQuote = () => {
	const unusedQuotes = db.filter(item => !addedQuotes.value.some(added => added.id === item.id))

	if (unusedQuotes.length === 0) {
		toast.error(`Can't add more quotes because there are none left.`)
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
		toast.error(`This quote is already added.`)
		return
	}

	const randomIndex = Math.floor(Math.random() * filteredQuotes.length)
	const newQuote = filteredQuotes[randomIndex]

	if (addedQuotes.value.some(item => item.id === newQuote.id)) {
		toast.error(`The quote with id ${newQuote.id} is already added.`)
	} else {
		addedQuotes.value.push(newQuote)
	}
}

const reset = ref<boolean>(false)
const resetSettings = () => {
	reset.value = true
	isNameShown.value = false
	selectedOption.value = ''
	addedQuotes.value = []
}

const isNameShown = ref<boolean>(false)
const showInfo = () => {
	isNameShown.value = true
}
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

	&__content {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 4rem;
	}
}

hr {
	margin: 0 auto;
	width: 160px;
}

@media (min-width: 1024px) {
	.main {
		&__content {
			padding: 1rem 2rem;
		}
	}
}
</style>
