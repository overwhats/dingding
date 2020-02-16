<template>
  <div class="home">
    <div class="userInfo item">
      <div class="left"><span>储丹&nbsp;17712311232</span></div>
      <div class="right">2020-02-17</div>
    </div>
    <div class="wrap">
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>车牌</div><input placeholder="请填写车牌" type="text"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>车辆颜色</div><input placeholder="请填写颜色" type="text"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>手机号</div><span style="color: #333333">17712311232</span></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>起点</div><div style="color: #333333;display: flex;align-items: center;">武进区<van-icon name="arrow" /></div></div>
      <div class="item wd van-hairline--bottom input-wrap"><span></span><input placeholder="请填写具体地址" type="text"></div>
      <div class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>出行路线</div><input placeholder="请简单的描述出行路线" type="text"></div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>终点</div>
      <div class="item wd van-hairline--bottom">
        <div class="my-check check"></div><span>总部</span>
      </div>
      <div class="item wd van-hairline--bottom">
        <div class="my-check"></div><span>国创</span>
      </div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>车辆状态</div>
      <div class="item wd van-hairline--bottom">
        <div class="my-check"></div><span>无空位</span>
      </div>
      <div class="item wd van-hairline--bottom">
        <div class="my-check"></div><span>有空位</span>
      </div>
      <div class="item wd wd-num van-hairline--bottom">
        <span>剩余可乘坐人数</span>
        <input type="text">
        <span>人</span>
      </div>
    </div>
    <div class="bottom">提交</div>
  </div>
</template>

<script>
import vue from 'vue';
import { Button,Toast, Checkbox, CheckboxGroup, Icon } from 'vant';
import {getUrlParam} from '../utils/auth'
vue.use(Button).use(Toast).use(Checkbox).use(CheckboxGroup).use(Icon);
export default {
  name: 'home',
  components: {

  },
    data(){
      return{
        checked:true
      }
    },
    methods:{

    },
    mounted(){
        // (process.env.VUE_APP_LOGIN_REDIRECT_URL===window.location.href)
        //this.createDDurl()
        this.code=getUrlParam('code');
    },
}
</script>
<style scoped lang="scss">
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
