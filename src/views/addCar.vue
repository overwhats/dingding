<template>
  <div class="home">
    <div class="userInfo item">
      <div class="left"><span v-if="userInfo">{{userInfo.userName}}&nbsp;{{userInfo.userTel}}</span></div>
      <div class="right">{{now}}</div>
    </div>
    <div class="wrap">
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>车牌</div><input @blur="inputBlur" placeholder="请填写车牌" type="text" v-model="params.no"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>车辆颜色</div><input @blur="inputBlur" placeholder="请填写颜色" type="text" v-model="params.color"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>手机号</div><span style="color: #333333">{{userInfo ? userInfo.userTel : ''}}</span></div>
      <div class="item wd van-hairline--bottom input-wrap" @click="showAreaPicker = true"><div><span class="red">*</span>起点</div><div style="color: #333333;display: flex;align-items: center;">{{params.startArea}}<van-icon name="arrow" /></div></div>
      <div class="item wd van-hairline--bottom input-wrap input-line"><input @blur="inputBlur" placeholder="请填写具体地址" type="text" v-model="params.startAddr"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>出行路线</div><textarea v-model="params.route" placeholder="请描述你经过的关键性道路，用逗号隔开如：中吴大道，龙江路高架，常武路" type="text"></textarea></div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>终点</div>
      <div class="item wd van-hairline--bottom" @click="params.endAddr = '总部'">
        <div class="my-check" :class="{check: params.endAddr == '总部'}"></div><span>总部</span>
      </div>
      <div class="item wd van-hairline--bottom" @click="params.endAddr = '国创'">
        <div class="my-check" :class="{check: params.endAddr == '国创'}"></div><span>国创</span>
      </div>
      <div class="item wd van-hairline--bottom" @click="params.endAddr = '4S店'">
        <div class="my-check" :class="{check: params.endAddr == '4S店'}"></div><span>4S店</span>
      </div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>车辆状态</div>
      <div class="item wd van-hairline--bottom" @click="params.status = 1, params.siteCnt = ''">
        <div class="my-check" :class="{check: params.status == 1}"></div><span>无空位</span>
      </div>
      <div class="item wd van-hairline--bottom" @click="params.status = 0">
        <div class="my-check" :class="{check: params.status == 0}"></div><span>有空位</span>
        <div class="item wd wd-num van-hairline--bottom">
          <span>剩余可乘坐人数</span>
          <input @blur="inputBlur" type="number" :disabled="params.status == 1" v-model="params.siteCnt">
          <span>人</span>
        </div>
      </div>
    </div>
    <div class="bottom" @click="submit">{{edit ? '修改' : '提交'}}</div>
    <van-action-sheet v-model="showAreaPicker" :actions="actions" @select="onAreaSelect" />
  </div>
</template>

<script>
import vue from 'vue';
import { Button,Toast, Checkbox, CheckboxGroup, Icon, ActionSheet } from 'vant';
import {getUrlParam} from '../utils/auth'
import { getCarListInfo, carAdd } from '@/api/user'
import dayjs from 'dayjs'
vue.use(Button).use(Toast).use(Checkbox).use(CheckboxGroup).use(Icon).use(ActionSheet);
export default {
  name: 'home',
  components: {

  },
    data(){
      return{
        userInfo: null,
        now: dayjs().format('YYYY-MM-DD'),
        checked:true,
        showAreaPicker: false,
        actions: [
          { name: '天宁区' },
          { name: '钟楼区' },
          { name: '戚墅堰区' },
          { name: '新北区' },
          { name: '武进区' },
          { name: '溧阳市' },
          { name: '金坛市' },
        ],
        params: {
          no: '',
          color: '',
          startAddr: '',
          route: '',
          startArea: '武进区',
          endAddr: '总部',
          status: 1,
          siteCnt: ''
        },
        edit: false,
      }
    },
    methods:{
      getCarInfo () {
        getCarListInfo({ unionId: localStorage.id }).then(
          res => {
            if (res.code === "200") {
              if(res.data.length > 0) {
                this.edit = true
                this.params = res.data[0]
              }
            }
          }
        );
      },
      onAreaSelect (item) {
        this.showAreaPicker = false;
        this.params.startArea = item.name
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
      submit () {
        if(this.params.no == '') {
          Toast('请填写车牌');
          return
        }
        if(this.params.color == '') {
          Toast('请填写颜色');
          return
        }
        if(this.params.startAddr == '') {
          Toast('请填写具体地址');
          return
        }
        if(this.params.route == '') {
          Toast('请填写出行路线');
          return
        }
        if(this.params.status == 0 && this.params.siteCnt == '') {
          Toast('请填写剩余可乘坐人数');
          return
        }
        console.log(this.params)
        carAdd({...this.params}).then(
          res => {
            if (res.code === "200") {
              console.log(res.data);
              Toast('提交成功！');
            } else {
              Toast(res.text);
            }
          },
          err => {
            Toast(err.text);
          }
        );
      }
    },
    mounted(){
        if (localStorage.id) {
          this.getCarInfo()
        }
        this.userInfo = localStorage.userInfo ? JSON.parse(localStorage.userInfo) : null;
        // this.userInfo = {
        //   unionId: 'uj16ewmjWSQutKkWNSiPBXAiEiE',
        //   userTel: '12333333333'
        // }
        console.log(this.userInfo)
    },
}
</script>
<style scoped lang="scss">
  .item{
    background: #fff;
    min-height: 44px;
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
    &.input-line {
      input {
        width: 100%;
        text-align: right;
      }
    }
    input{
      border: none;
      text-align: right;
    }
    textarea {
      flex: 1;
      text-align: right;
      margin-left: 20px;
      border:none !important;
    }
  }
  .my-check{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #aaa;
    margin-right: 10px;
  }
  .fang{
    border-radius: 0;
    width: 16px;
    height: 16px;
  }
  .dis{
    background: #eee;
  }
  .my-check.check{
    background-color: #1989fa;
    background-image: url("../assets/check.png");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
