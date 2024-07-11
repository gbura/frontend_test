<template>
	<TheHeader :isNameShown="isNameShown" />
	<main class="main">
		<h1 class="title">Nagłówek H1</h1>
		<hr />
		<div class="content">
			<BlockOne v-model="selectedOption" />
			<BlockTwo @replace="replaceQuote" @add="addQuote" />
			<BlockThree :quote="quote" />
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
import { Options } from '@/types/OptionsType'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const toast = useToast()

const db = database
const quote = ref<string>('')

const reset = ref<boolean>(false)
const resetSettings = () => {
	reset.value = true
	isNameShown.value = false
	quote.value = ''
}

const isNameShown = ref<boolean>(false)
const showInfo = () => {
	isNameShown.value = true
}

const selectedOption = ref<string>('')

const replaceQuote = () => {
	switch (selectedOption.value) {
		case Options.FIRST:
			quote.value = db[0]
			break
		case Options.SECOND:
			quote.value = db[1]
			break
		case Options.THIRD:
			const remainingQuotes = db.slice(2)
			const randomIndex = Math.floor(Math.random() * remainingQuotes.length)
			quote.value = remainingQuotes[randomIndex]
			break
		default:
			break
	}
}

const addQuote = () => {
	if (selectedOption.value === Options.FIRST) {
		return toast.error(`Can't add new quote to this option.`)
	} else if (selectedOption.value === Options.SECOND) {
		return toast.error(`Can't add new quote to this option.`)
	}
	const unusedQuotes = db.filter(item => item !== quote.value)
	if (unusedQuotes.length > 0) {
		const randomIndex = Math.floor(Math.random() * unusedQuotes.length)
		const newQuote = unusedQuotes[randomIndex]
		quote.value += ` ${newQuote}`
	}
}
</script>

<style lang="scss" scoped>
.main {
	margin-top: 1rem;
	padding: 1rem;
}

.title {
	text-align: center;
	font-weight: normal;
	margin-bottom: 1rem;
}

hr {
	margin: 0 auto;
	width: 160px;
}

.content {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 4rem;
}

@media (min-width: 1024px) {
	.main,
	.content {
		padding: 1rem 2rem;
	}
}
</style>
