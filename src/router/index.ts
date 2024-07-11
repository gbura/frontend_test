import { createRouter, createWebHistory } from 'vue-router'
import MainBlockView from '../views/MainBlockView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: MainBlockView,
		},
	],
})

export default router
