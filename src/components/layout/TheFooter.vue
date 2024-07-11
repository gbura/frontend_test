<template>
	<footer class="footer">
		<div class="modal" v-if="isModalOpen">
			<div class="modal__container">
				<button @click="resetSettings">
					<font-awesome-icon :icon="['fas', 'angle-right']" class="icon" /> zresetuj ustawienia
				</button>
				<button @click="showInfo">
					<font-awesome-icon :icon="['fas', 'angle-right']" class="icon" /> pokaż dane osobowe
				</button>
			</div>
		</div>
		<div class="footer__container">
			<div class="footer__container--text">
				<p>
					css<br />
					is <br />
					awesome
				</p>
			</div>
			<div class="footer__container--company">
				<p>nabthat</p>
			</div>
			<div class="footer__container--button">
				<button @click="openModal">
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
			width: 67px;
			border: 1px solid $main-background;
			padding: 0 0.2rem;

			p {
				color: $main-background;
				text-transform: uppercase;
			}

			&:hover {
				cursor: pointer;
				border-color: $hover-orange;

				p {
					color: $light-text;
				}
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

@media (min-width: 1024px) {
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
