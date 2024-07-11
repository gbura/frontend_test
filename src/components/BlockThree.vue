<template>
	<div class="block-content">
		<h2
			class="block-content__title"
			aria-label="blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi">
			blok z długą nazwą która sama się przytnie i będzie ucinała resztę tekstu, bo ten tekst jest bardzo długi
		</h2>
		<div class="block-content__text">
			<TransitionGroup name="quotes-list">
				<template v-for="quote in sortedQuotes" :key="quote.id">
					<div class="edit-modal" v-if="editableQuoteId === quote.id">
						<input
							class="edit-modal__input"
							type="text"
							v-model="editableQuoteText"
							@keyup.enter="saveEdit(quote.id)" />
						<button class="edit-modal__save-button" aria-label="Przycisk zapisz" @click="saveEdit(quote.id)">
							<font-awesome-icon :icon="['fas', 'floppy-disk']" class="edit-modal__save-button--icon" />
						</button>
					</div>
					<p v-else class="quote" :aria-label="quote.quote">
						{{ quote.quote }}
						<span class="quote__icon">
							<font-awesome-icon :icon="['fas', 'trash']" class="quote__icon--trash" @click="deleteQuote(quote.id)" />
							<font-awesome-icon :icon="['fas', 'pen-to-square']" class="quote__icon--edit" @click="editQuote(quote)" />
						</span>
					</p>
				</template>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Quote } from '@/types/OptionsType'
import { computed, ref } from 'vue'

const props = defineProps<{ quotes: Quote[] }>()
const emit = defineEmits(['deleteQuote', 'updateQuote'])

const editableQuoteId = ref<number | null>(null)
const editableQuoteText = ref<string>('')

const sortedQuotes = computed(() => {
	return props.quotes.sort((a, b) => a.quote.localeCompare(b.quote))
})

const editQuote = (quote: Quote) => {
	editableQuoteId.value = quote.id
	editableQuoteText.value = quote.quote
}

const saveEdit = (id: number) => {
	emit('updateQuote', { id, quote: editableQuoteText.value })
	editableQuoteId.value = null
	editableQuoteText.value = ''
}

const deleteQuote = (id: number) => {
	emit('deleteQuote', id)
}
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

		.quote {
			position: relative;
			margin-bottom: 1rem;
			font-size: 0.9rem;
			&__icon {
				position: absolute;
				right: -0.5rem;
				cursor: pointer;

				&--trash {
					margin-right: 0.2rem;
				}
			}
		}
	}

	.edit-modal {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;

		&__input {
			width: 100%;
			padding: 0.7rem 1rem;
			background-color: transparent;
			border: 1px solid $light-text;
			border-radius: 2px;
			color: $light-text;

			outline-color: $light-text;
		}

		&__save-button {
			color: $light-text;
			font-size: 1.1rem;
			background-color: transparent;
		}
	}
}
@media (min-width: 960px) {
	.block-content {
		width: 33%;
		margin-top: 0;
	}
}

@media (min-width: 1024px) {
	.block-content {
		&__text {
			.quote {
				font-size: 1rem;
				&__icon {
					right: -1rem;
				}
			}
		}
	}
}
</style>
