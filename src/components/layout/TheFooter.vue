<template>
	<footer class="footer">
		<Transition name="footer__slide">
			<div class="footer__modal" v-if="isModalOpen">
				<div class="footer__modal-container">
					<button @click="resetSettings" aria-label="Zresetuj ustawienia" class="footer__modal-button">
						<font-awesome-icon :icon="['fas', 'angle-right']" class="footer__icon" /> zresetuj ustawienia
					</button>
					<button @click="showInfo" aria-label="Pokaż dane osobowe" class="footer__modal-button">
						<font-awesome-icon :icon="['fas', 'angle-right']" class="footer__icon" /> pokaż dane osobowe
					</button>
				</div>
			</div>
		</Transition>
		<div class="footer__container">
			<div class="footer__text">
				<p class="footer__text-content">
					css<br />
					is <br />
					awesome
				</p>
			</div>
			<div class="footer__company">
				<p class="footer__company-name" aria-label="Nazwa firmy nabthat">nabthat</p>
			</div>
			<div class="footer__button-container">
				<button @click="openModal" aria-label="Pokaż" class="footer__button">
					pokaż
					<font-awesome-icon :icon="['fas', 'angle-up']" v-if="!isModalOpen" class="footer__icon" />
					<font-awesome-icon :icon="['fas', 'angle-down']" v-else class="footer__icon" />
				</button>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref<boolean>(false)
const openModal = () => (isModalOpen.value = !isModalOpen.value)

const emits = defineEmits(['resetSettings', 'showInfo'])

const resetSettings = () => {
	emits('resetSettings')
	isModalOpen.value = false
}
const showInfo = () => {
	emits('showInfo')
	isModalOpen.value = false
}
</script>

<style lang="scss" scoped>
@import '@/assets/main.scss';

.footer__slide-enter-active {
	transition: all 0.3s ease-out;
}

.footer__slide-leave-active {
	transition: all 0.5s ease-out;
}

.footer__slide-enter-from,
.footer__slide-leave-to {
	transform: translateY(20px);
	opacity: 0;
}

.footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	background-color: $footer-background;

	&__container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 85px;
		padding: 0 1rem;
	}

	&__text {
		width: 5.5rem;
		position: relative;
		padding: 0 0.2rem;
		overflow: hidden;

		&-content {
			color: $main-background;
			text-transform: uppercase;
			position: relative;
			z-index: 1;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 75%;
			height: 100%;
			border: 1px solid $main-background;
			transition: transform 2s ease-out;
			z-index: 0;
		}

		&:hover::before {
			transform: rotate(360deg);
			border-color: $hover-orange;
		}

		&:hover &-content {
			color: $light-text;
		}

		&:hover {
			cursor: pointer;
		}
	}

	&__company {
		display: none;
		position: relative;
		margin-left: 6rem;

		&-name {
			color: $main-background;
			position: relative;
			padding: 0 1rem;

			&::before,
			&::after {
				content: '';
				position: absolute;
				top: 50%;
				width: 50px;
				height: 1px;
				background-color: $main-background;
			}

			&::before {
				left: -40px;
			}

			&::after {
				right: -40px;
			}
		}
	}

	&__button-container {
		button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			padding: 0.5rem 4rem;
			background-color: transparent;
			border: 1px solid $main-background;
			font-weight: bold;
			color: $light-text;
			text-transform: uppercase;

			&:hover {
				color: $main-text;
				border-color: $main-text;
				transition: border-color 0.5s ease, color 0.5s ease;
			}
		}
	}
}

.footer__modal {
	position: absolute;
	top: -3.7rem;
	right: 1rem;
	display: flex;
	flex-direction: column;
	width: 192px;
	border-radius: 2px;
	overflow: hidden;
	box-shadow: 0 0 20px black;
	background-color: #fff;

	&-container {
		padding: 0.5rem 0 0.5rem 1rem;
	}

	&-button {
		text-align: left;
		background-color: transparent;
		text-transform: uppercase;
		font-weight: bold;
		font-size: 0.7rem;

		&:hover {
			color: $hover-orange;
		}
	}
}

@media (min-width: 960px) {
	.footer {
		padding: 0rem 2rem;

		&__company {
			display: flex;
		}
	}
	.footer__modal {
		right: 3rem;
	}
}
</style>
