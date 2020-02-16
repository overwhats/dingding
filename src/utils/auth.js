import Cookies from 'js-cookie'

const TokenKey = 'project-token'
const paramUrl = window.location.href.split('?')[1];
export function getToken () {
	return Cookies.get(TokenKey)
}

export function setToken (token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken () {
	return Cookies.remove(TokenKey)
}

export function getUrlParam (paramName) {
	let [paramValue, isFound] = ['', !1];
	if (!paramUrl) {
		return null;
	}
	if (paramUrl.indexOf('=') > 1) {
		const arrSource = paramUrl.split('&');
		let i = 0;
		while (i < arrSource.length && !isFound) {
			const item = arrSource[i];
			if (item.indexOf('=') > 0 && item.split('=')[0].toLowerCase() === paramName.toLowerCase()) {
				paramValue = decodeURIComponent(item.split('=')[1]);
				isFound = !0;
			}
			i++;
		}
	}
	paramValue === '' && (paramValue = null);
	return paramValue;
}
