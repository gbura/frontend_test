<template>
	<div class="block-content">
		<h2
			class="block-content__title"
			aria-label="blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi">
			blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi
		</h2>
		<div class="block-content__text">
			<p v-for="(quote, index) in quotes" :key="index" :aria-label="quote">
				{{ quote }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{ quotes: string[] }>()
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

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
@media (min-width: 1024px) {
	.block-content {
		width: 33%;
		margin-top: 0;
	}
}
</style>
