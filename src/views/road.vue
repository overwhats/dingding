<template>
  <div class="home">
    <div class="userInfo item">
      <div class="left"><span v-if="userInfo">{{userInfo.userName}}&nbsp;{{userInfo.userTel}}</span></div>
      <div class="right">{{now}}</div>
    </div>
    <div class="wrap">
      <div class="item wd van-hairline--bottom input-wrap" @click="showStartPicker = true"><div><span class="red">*</span>出发地</div><div style="color: #333333;display: flex;align-items: center;">{{params.startArea}}<van-icon name="arrow" /></div></div>
      <div class="item wd van-hairline--bottom input-wrap" @click="showTerminalPicker = true"><div><span class="red">*</span>目的地</div><div style="color: #333333;display: flex;align-items: center;">{{params.endAddr}}<van-icon name="arrow" /></div></div>
      <div class="item wd van-hairline--bottom search-wrap"><input @blur="inputBlur" v-model="params.startAddr" placeholder="请输入地址" type="text"> <div class="search-btn" @click="search">查询</div></div>
    </div>
    <ul class="address-list" v-if="carList.length > 0">
      <li v-for="(it, i) in carList" :key="i">
        <div>
          <div class="top-line"><span>{{it.startArea}}</span>&nbsp;{{it.startAddr}}</div>
          <div class="bottom-line">{{it.userName}}&nbsp;<a style="color: #333;" :href='`tel:${it.userTel}`'>{{it.userTel}}</a>&nbsp;{{it.no}}&nbsp;{{it.color}}&nbsp;{{it.endAddr}}</div>
          <div class="route" v-if="it.route">(出行路线：{{it.route}})</div>
        </div>
      </li>
    </ul>
    <div v-else class="no-data">暂无数据</div>
    <van-action-sheet v-model="showStartPicker" :actions="startActions" @select="onStartSelect" />
    <van-action-sheet v-model="showTerminalPicker" :actions="terminalActions" @select="onTerminalSelect" />
  </div>
</template>

<script>
import vue from 'vue';
import { Button,Toast, Checkbox, CheckboxGroup, Icon, ActionSheet } from 'vant';
import {getUrlParam} from '../utils/auth'
import { getCarListInfo } from '@/api/user'
import dayjs from 'dayjs'
vue.use(Button).use(Toast).use(Checkbox).use(CheckboxGroup).use(Icon).use(ActionSheet);
export default {
  name: 'home',
  components: {

  },
    data(){
      return{
        userInfo: null,
        checked:true,
        showStartPicker: false,
        now: dayjs().format('YYYY-MM-DD'),
        startActions: [
          { name: '天宁区' },
          { name: '钟楼区' },
          { name: '戚墅堰区' },
          { name: '新北区' },
          { name: '武进区' },
          { name: '溧阳市' },
          { name: '金坛市' },
        ],
        showTerminalPicker: false,
        terminalActions: [
          { name: '总部' },
          { name: '国创' },
          { name: '4S店' },
        ],
        params: {
          startArea: '武进区',
          startAddr: '',
          endAddr: '总部',
        },
        carList: []
      }
    },
    methods:{
      onStartSelect (item) {
        this.showStartPicker = false;
        this.params.startArea = item.name
      },
      onTerminalSelect (item) {
        this.showTerminalPicker = false;
        this.params.endAddr = item.name
      },
      inputBlur () {
        setTimeout(() => {
          if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return
          }
          let result = 'pc';
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
            result = 'ios'
          } else if (/(Android)/i.test(navigator.userAgent)) { // 判断Android
            result = 'android'
          }
          if (result === 'ios') {
            document.activeElement.scrollIntoViewIfNeeded(true);
          }
        }, 100)
      },
      search () {
        getCarListInfo({...this.params}).then(
          res => {
            if (res.code === "200") {
              if(res.data.length > 0) {
                this.carList = res.data
              } else {
                this.carList = []
              }
            } else {
              Toast(err.text);
            }
          },
          err => {
            Toast(err.text);
          }
        );
      }
    },
    mounted(){
        // (process.env.VUE_APP_LOGIN_REDIRECT_URL===window.location.href)
        //this.createDDurl()
        this.userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null;
    },
}
</script>
<style scoped lang="scss">
  input {
    border: none !important;
    font-weight: 500;
    color: #333;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #999;
    font-size: 14px;
    font-weight: 400 !important;
  }
  .item{
    background: #fff;
    height: 44px;
    display: flex;
    align-items: center;
  }
  .userInfo{
    justify-content: space-between;
    padding: 0 12px 0 22px;
    color: #666666;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .userInfo span{
    color: #000;
    font-size: 15px;
    font-weight: bold;
  }
  .red{
    color: #FF6969;
  }
  .title{
    color: #333333;
    font-size: 15px;
    padding-left: 15px;
  }
  .wd{
    padding-left: 16px;
    color: #666666;
    font-size: 14px;
  }
  .wd-num{
    padding-left: 46px;
    .t{
      color: #333333;
    }
    input{
      width: 86px;
      height: 26px;
      border: none;
      outline: none;
      background: #F5F5F5;
      margin: 0 10px;
      padding-left: 10px;
    }
    ul{
      display: flex;
      padding-left: 16px;
      li{
        margin-right: 10px;
      }
    }
  }
  .wrap{
    margin-bottom: 5px;
  }
  .child{
    padding-left: 46px!important;
  }
  .btn-wrap{
    justify-content: space-between;
    padding-right: 12px;
    .btn{
      width: 130px;
      line-height: 30px;
      border-radius: 2px;
      text-align: center;
      color: #fff;
      background: #3296FA;
      font-size: 14px;
    }
  }
  .bottom{
    width: 345px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    border-radius: 6px;
    background: #3296FA;
    margin: 0 auto;
    margin-top: 28px;
  }
  .home{
    padding-bottom: 24px;
  }
  .input-wrap{
    justify-content: space-between;
    padding-right: 12px;
    input{
      border: none;
      text-align: right;
    }
  }
  .search-wrap{
    justify-content: space-between;
    padding: 0 15px 0 13px;
    input{
      width: 260px;
      height: 30px;
      background:rgba(248,248,248,1);
      border:1px solid rgba(238,238,238,1);
      border-radius:2px;
      padding-left: 7px;
      font-size: 14px;
      box-sizing: border-box;
    }
    div{
      width:79px;
      line-height:29px;
      background:rgba(50,150,250,1);
      border-radius:2px;
      text-align: center;
      color: #fff;
    }

  }
  .address-list{
    margin-top: 10px;
    .route {
      font-size: 12px;
      color: grey;
    }
  }
  .address-list li{
    display: flex;
    align-items: center;
    text-align: left;
    background: #fff;
    height: 66px;
    margin: 0 12px;
    padding-left: 17px;
    margin-bottom: 7px;
    font-size: 14px;
    color: #333333;
    line-height:20px;
    span{
      color: #3296FA;
    }
  }
  .no-data {
    font-size: 15px;
    color: #ccc;
    margin-top: 20px;
  }
</style>
