<template>
  <div class="home">
    <van-action-sheet v-model="showTarget" :actions="targetList" @select="selectTarget" />
    <van-action-sheet v-model="showAddress" :actions="addressList" @select="selectAddress" />
    <div class="userInfo item">
      <div class="left"><span>{{userInfo.userName}}&nbsp;{{userInfo.userTel}}</span></div>
      <div class="right">{{now}}</div>
    </div>
    <div class="wrap">
      <div @click="showTarget=true" class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>目的地</div><div style="color: #333333;display: flex;align-items: center;">{{target}}<van-icon name="arrow" /></div></div>
      <div @click="showAddress = true" class="item wd van-hairline--bottom input-wrap"><div><span class="red">*</span>地址</div><div style="color: #333333;display: flex;align-items: center;">{{address}}<van-icon name="arrow" /></div></div>
      <div class="item wd van-hairline--bottom search-wrap"><input v-model="searchAddress" placeholder="请输入地址" type="text"> <div class="search-btn" @click="search">查询</div></div>
    </div>
    <ul class="address-list">
      <li>
        <div>
          <div class="top-line"><span>武进区</span>&nbsp;龙套香榭丽园5栋乙单元2802</div>
          <div class="bottom-line">储丹&nbsp;18862144378&nbsp;苏DW125R&nbsp;红色&nbsp;国创</div>
        </div>
      </li>
      <li>
        <div>
          <div class="top-line"><span>武进区</span>&nbsp;龙套香榭丽园5栋乙单元2802</div>
          <div class="bottom-line">储丹&nbsp;18862144378&nbsp;苏DW125R&nbsp;红色&nbsp;国创</div>
        </div>
      </li>
    </ul>
    <div class="bottom">提交</div>
  </div>
</template>

<script>
import vue from 'vue';
import dayjs from 'dayjs'
import { Button,Toast, Checkbox, CheckboxGroup, Icon , ActionSheet } from 'vant';
import {getUrlParam} from '../utils/auth'
vue.use(ActionSheet).use(Toast).use(Checkbox).use(CheckboxGroup).use(Icon);
export default {
  name: 'home',
  components: {

  },
    data(){
      return{
        targetList:[
          {name:'国创'},{name:'总部'},{name:'4s店'}
        ],
        addressList:[
          {name:'武进区'},{name:'天宁区'},{name:'新北区'},{name:'钟楼区'},{name:'戚墅堰区'},{name:'溧阳区'},{name:'金坛市'}
        ],
        target: '总部',
        address: '国创',
        showTarget: false,
        showAddress: false,
        checked:true,
        userInfo: {},
        now: dayjs().format('YYYY-MM-DD'),
        searchAddress: ''
      }
    },
    methods:{
      selectTarget(item) {
        this.target = item.name;
        this.showTarget = false;
        console.log(item.name);
      },
      selectAddress(item) {
        this.address = item.name;
        this.showAddress = false;
        console.log(item.name);
      },
      search() {

      }
    },
  mounted(){
    this.userInfo = JSON.parse(localStorage.userInfo);
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
</style>
