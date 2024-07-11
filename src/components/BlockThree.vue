<template>
	<div class="block-content">
		<h2
			class="block-content__title"
			aria-label="blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi">
			blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi
		</h2>
		<div class="block-content__text">
			<TransitionGroup name="quotes-list">
				<p v-for="(quote, index) in sortedQuotes" :key="index" :aria-label="quote">
					{{ quote }}
				</p>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ quotes: string[] }>()

const sortedQuotes = computed(() => {
	return props.quotes.sort((a: string, b: string) => {
		return a.localeCompare(b)
	})
})
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.quotes-list-enter-active,
.quotes-list-leave-active {
	transition: all 0.5s ease;
}
.quotes-list-enter-from,
.quotes-list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

.block-content {
	width: 100%;
	margin-top: 4rem;
	margin-bottom: auto;
	&__title {
		text-align: center;
		text-transform: uppercase;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 1.3rem;
	}

	&__text {
		margin-top: 3rem;
		padding-bottom: 6rem;
		text-align: center;
		color: $light-text;
	}
}
@media (min-width: 960px) {
	.block-content {
		width: 33%;
		margin-top: 0;
	}
}
</style>
