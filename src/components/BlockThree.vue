<template>
	<div class="block-content">
		<h2
			class="block-content__title"
			aria-label="blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu">
			blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu
		</h2>
		<div class="block-content__text">{{ quote }}</div>
	</div>
</template>

<script setup lang="ts">
defineProps(['quote'])
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.block-content {
	width: 100%;
	margin-top: 4rem;
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
