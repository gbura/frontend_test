<template>
	<header class="header">
		<RouterLink to="/" class="header__logo">
			<font-awesome-icon :icon="['fab', 'html5']" class="header__logo--icon" />
		</RouterLink>
		<div class="header__title">
			<p class="header__title--text">Zadanie <span class="header__title--span">rekrutacyjne</span></p>
			<p class="header__title--name" v-if="isNameShown">Dawid Gburczyk</p>
		</div>
	</header>
</template>

<script setup lang="ts">
defineProps(['isNameShown'])
</script>

<style scoped lang="scss">
@import '@/assets/main.scss';

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 85px;
	padding: 0 1rem;
	background-color: $header-background;

	&__logo {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $logo-background;
		width: 50px;
		height: 50px;
		border-radius: 50%;

		&:hover {
			background-color: $hover-orange;
		}

		&--icon {
			width: 35px;
			height: 35px;
			color: $main-text;
		}
	}

	&__title {
		color: $main-text;

		&--span {
			font-weight: bold;
		}
		&--name {
			text-align: right;
		}
	}
}

@media (min-width: 1024px) {
	.header {
		padding: 1rem 2rem;

		&__logo {
			width: 70px;
			height: 70px;

			&--icon {
				width: 45px;
				height: 45px;
			}
		}

		&__title {
			&--text {
				font-size: 1.4rem;
			}
			&--name {
				font-size: 1.4rem;
			}
		}
	}
}
</style>
