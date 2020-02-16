import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons'
import Vconsole from 'vconsole'
/*import {getUserId,enableEvatation} from '@/api/user'
import {getUrlParam,setToken} from '@/utils/auth'
import vue from 'vue';
import { Button,Toast} from 'vant';*/
let vConsole = new Vconsole()
Vue.use(vConsole)
Vue.config.productionTip = false;
(function (baseFontSize) {
	const _baseFontSize = baseFontSize || 75;
	const ua = navigator.userAgent;
	const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
	const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
	let dpr = window.devicePixelRatio || 1;
	if (!isIos && !(matches && matches[1] > 534)) {
		// 如果非iOS, 非Android4.3以上, dpr设为1;
		dpr = 1;
	}
	const scale = 1 / dpr;
	let metaEl = document.querySelector('meta[name="viewport"]');
	if (!metaEl) {
		metaEl = document.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		window.document.head.appendChild(metaEl);
	}
	metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);

	document.documentElement.style.fontSize = document.documentElement.clientWidth / (750 / _baseFontSize) + 'px';
})();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
