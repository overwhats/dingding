/*
import request from '@/utils/request'

export default {
	getUserInfo(){
		return request({
			url:'',
			method:'get'
		})
	}
}*/
import { get, post } from '@/utils/request'

 const inviteeList = (params) => get('/api/invitee/list', params);
const inviteeLock = (params) => get('/api/invitee/lock', params);
const inviteeCommit = (params) => get('/api/invitee/commit', params);
const evaluteList = (params) => get('/api/evaluate/list', params);
const evaCommit = (params) => get('/api/evaluate/commit', params);
const progressInfo = (params) => get('/api/progress/360', params);
const enableEvatation = (params) => get('/api/invitee/enable', params);
const getUserId = (params) => get('/api/dingtalk/code', params);
const carAdd = (params) => get('/api/car/add', params); // 添加车辆
const getUserInfo = (params) => get('/api/user/get', params); // 添加车辆
const getCarListInfo = (params) => get('/api/car/list', params); // 车辆信息-查询
const userCommit = (params) => get('/api/user/commit', params); // 添加车辆
export {
	userCommit,
	getUserInfo,
	carAdd,
	inviteeList,
	inviteeLock,
	inviteeCommit,
	evaluteList,
	evaCommit,
	progressInfo,
	getUserId,
	enableEvatation,
	getCarListInfo
}
