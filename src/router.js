import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	// mode: 'history',
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/submitSuccess',
			name: 'submitSuccess',
			component: () => import('./views/submitSuccess.vue')
		},
		{
			path: '/addCar',
			name: 'addCar',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('./views/addCar.vue')
		},
		{
			path: '/road',
			name: 'road',
			component: () => import('./views/road.vue')
		},
		{
			path: '/Progress',
			name: 'Progress',
			component: () => import('./views/Progress.vue')
		},
		{ path: '/404', component: () => import('@/views/404') },
		{ path: '*', redirect: '/404' }
	]
});
