import axios from 'axios'
import store from '@/store'
import {getToken} from '../utils/auth'
import Vue from 'vue';
import { Toast } from 'vant';
import router from '@/router'
Vue.use(Toast);
// 创建axios 实例
const service = axios.create({
	baseURL: process.env.VUE_APP_SERVER_URL, // api的base_url
	timeout: 10000, // 请求超时时间
	/*headers: {
		token: getToken || ''
	}*/
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
	400: '请求参数错误',
	401: '权限不足, 请重新登录',
	403: '服务器拒绝本次访问',
	404: '请求资源未找到',
	500: '内部服务器错误',
	501: '服务器不支持该请求中使用的方法',
	502: '网关错误',
	504: '网关超时'
}

// request 拦截器
service.interceptors.request.use(
	config => {
		// 这里可以自定义一些config 配置
		
		// loading + 1
		store.dispatch('SetLoading', true)
		
		return config
	},
	error => {
		//  这里处理一些请求出错的情况
		
		// loading 清 0
		setTimeout(function () {
			store.dispatch('SetLoading', 0)
		}, 300)
		
		console.log(error)
		Promise.reject(error)
	}
)

// response 拦截器
service.interceptors.response.use(
	response => {
		console.log(response)
		const res = response.data
		// 这里处理一些response 正常放回时的逻辑
		
		// loading - 1
		store.dispatch('SetLoading', false)
		
		return res
	},
	error => {
		console.log(error)
		// loading - 1
		store.dispatch('SetLoading', false)
		// 这里处理一些response 出错时的逻辑
		if (error.data) {
			// 根据请求失败的http状态码去给用户相应的提示
			let tips = error.data.code in httpCode ? httpCode[error.data.code] : error.data.text
			Toast.fail(tips);
			if (error.data.code === 401) {    // token或者登陆失效情况下跳转到登录页面，根据实际情况，在这里可以根据不同的响应错误结果，做对应的事。这里我以401判断为例
				router.push({
					path: `/`
				})
			}
			return Promise.reject(error)
		} else {
			Toast.fail('请求超时, 请刷新重试');
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
	return new Promise((resolve, reject) => {
		service({
			method: 'get',
			url,
			params,
			...config
		}).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
	return new Promise((resolve, reject) => {
		service({
			method: 'post',
			url,
			data,
			...config
		}).then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})
}

export default service
