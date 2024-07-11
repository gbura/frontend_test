<template>
	<div class="block-content">
		<h2 class="block-content__title" aria-label="Blok pierwszy">blok pierwszy</h2>
		<div class="block-content__buttons">
			<div class="block-content__radio" v-for="option in options" :key="option.value">
				<input
					type="radio"
					:id="option.value"
					:value="option.value"
					:aria-label="option.value"
					name="option"
					v-model="model"
					@change="emitSelectedOption" />
				<label :for="option.value" class="block-content__label">{{ option.label }}</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { type OptionsType, Options } from '@/types/OptionsType'
import { watch } from 'vue'

const emit = defineEmits(['selectOption'])
const model = defineModel()

const options = [
	{ value: Options.FIRST, label: 'Opcja pierwsza' },
	{ value: Options.SECOND, label: 'Opcja druga' },
	{ value: Options.THIRD, label: 'Opcja trzecia' },
] as OptionsType[]

const emitSelectedOption = () => {
	emit('selectOption', model.value)
}

watch(model, () => {
	emitSelectedOption
})
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.block-content {
	width: 50%;

	&__title {
		text-align: left;
		text-transform: uppercase;
		font-size: 1.3rem;
	}

	&__buttons {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-top: 2rem;
	}

	&__radio {
		display: flex;
		gap: 1rem;
		color: $light-text;

		input[type='radio'] {
			display: none;

			& + .block-content__label {
				position: relative;
				padding-left: 3rem;
				cursor: pointer;
			}

			& + .block-content__label::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 2rem;
				height: 2rem;
				border: 2px solid $main-text;
				border-radius: 50%;
				background-color: transparent;
			}

			& + .block-content__label::after {
				content: '';
				position: absolute;
				left: 5.5%;
				top: 50%;
				transform: translateY(-50%);
				width: 1rem;
				height: 1rem;
				border-radius: 50%;
				background-color: transparent;
			}

			&:checked + .block-content__label::after {
				background-color: $main-text;
			}

			&:checked + .block-content__label {
				color: $main-text;
			}
		}
	}
}

@media (min-width: 960px) {
	.block-content {
		width: 33%;

		&__title {
			text-align: center;
		}

		&__buttons {
			margin-top: 3rem;
		}
	}
}
</style>
