<template>
	<div class="block-content">
		<h2 class="block-content__title" aria-label="Blok drugi">blok drugi</h2>
		<div class="block-content__buttons">
			<button @click="emits('replace')" class="block-content__buttons--button" aria-label="Przycisk zastąp">
				zastąp
			</button>
			<button @click="emits('add')" class="block-content__buttons--button" aria-label="Przycisk doklej">doklej</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const emits = defineEmits(['replace', 'add'])
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.block-content {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	width: 50%;

	&__title {
		text-align: right;
		text-transform: uppercase;
		font-size: 1.3rem;
	}

	&__buttons {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 3rem;

		&--button {
			text-transform: uppercase;
			background-color: transparent;
			border: 1px solid $light-text;
			color: $light-text;
			padding: 0.7rem 3rem;
			font-weight: bold;
			border-radius: 2px;
			cursor: pointer;
			transition: background-color 0.3s, color 0.3s;

			&:hover {
				background-color: $hover-orange;
				color: $main-text;
			}
		}
	}
}

@media (min-width: 960px) {
	.block-content {
		width: 33%;
		align-items: center;

		&__title {
			text-align: center;
		}

		&__buttons {
			flex-direction: row;
			justify-content: center;
		}
	}
}
</style>
