<template>
	<footer class="footer">
		<Transition name="slide">
			<div class="modal" v-if="isModalOpen">
				<div class="modal__container">
					<button @click="resetSettings" aria-label="Zresetuj ustawienia">
						<font-awesome-icon :icon="['fas', 'angle-right']" class="icon" /> zresetuj ustawienia
					</button>
					<button @click="showInfo" aria-label="Pokaż dane osobowe">
						<font-awesome-icon :icon="['fas', 'angle-right']" class="icon" /> pokaż dane osobowe
					</button>
				</div>
			</div>
		</Transition>
		<div class="footer__container">
			<div class="footer__container--text">
				<p>
					css<br />
					is <br />
					awesome
				</p>
			</div>
			<div class="footer__container--company">
				<p aria-label="Nazwa firmy nabthat">nabthat</p>
			</div>
			<div class="footer__container--button">
				<button @click="openModal" aria-label="Pokaż">
					pokaż
					<font-awesome-icon :icon="['fas', 'angle-up']" v-if="!isModalOpen" class="icon" />
					<font-awesome-icon :icon="['fas', 'angle-down']" v-else />
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

.slide-enter-active {
	transition: all 0.3s ease-out;
}

.slide-leave-active {
	transition: all 0.5s ease-out;
}

.slide-enter-from,
.slide-leave-to {
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

		&--text {
			width: 5.5rem;
			position: relative;
			padding: 0 0.2rem;
			overflow: hidden;

			p {
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

			&:hover p {
				color: $light-text;
			}

			&:hover {
				cursor: pointer;
			}
		}

		&--company {
			display: none;
			position: relative;
			margin-left: 7rem;

			p {
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

		&--button {
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
				}
			}
		}
	}
}

.modal {
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

	&__container {
		padding: 0.5rem 0 0.5rem 1rem;
	}

	button {
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

		&__container {
			&--company {
				display: block;
			}
		}
	}
	.modal {
		right: 3rem;
	}
}
</style>
