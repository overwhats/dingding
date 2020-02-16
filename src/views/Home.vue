<template>
  <div class="home">
    <div class="userInfo item">
      <div class="left"><span>{{userInfo.userName}}&nbsp;{{userInfo.userTel}}</span></div>
      <div class="right">{{now}}</div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>今日在家检测</div>
      <div @click="homeStatus=true" class="item wd van-hairline--bottom"><div :class="`my-check ${homeStatus? 'check' : ''}`"></div>正常&nbsp; 小于37.3度</div>
      <div @click="homeStatus=false" class="item wd van-hairline--bottom"><div :class="`my-check ${!homeStatus? 'check' : ''}`"></div>异常&nbsp; 大于37.3度</div>
      <div class="item wd wd-num van-hairline--bottom">
        <span class="t">温度</span>
        <input :disabled="homeStatus" v-model="homeTemp" type="number">
        <span>度</span>
      </div>
      <div class="item wd wd-num van-hairline--bottom">
        <span class="t">异常</span>
        <ul>
          <li v-for="(item, index) in ycList" @click="yc(index)"><div :class="`fang my-check ${homeStatus? 'dis' : ''} ${item.check&&!homeStatus? 'check' : ''}`"></div>{{item.text}}</li>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span>今日门岗检测</div>
      <div @click="watchStatus = true" class="item wd van-hairline--bottom"><div :class="`my-check ${watchStatus? 'check' : ''}`"></div>正常&nbsp; 小于37.3度</div>
      <div @click="watchStatus = false" class="item wd van-hairline--bottom"><div :class="`my-check ${!watchStatus? 'check' : ''}`"></div>异常&nbsp; 大于37.3度</div>
      <div class="item wd wd-num van-hairline--bottom">
        <span class="t">温度</span>
        <input v-model="watchTemp" :disabled="watchStatus" type="number">
        <span>度</span>
      </div>
      <div class="item wd wd-num van-hairline--bottom">
        <span class="t">异常</span>
        <ul>
          <li v-for="(item,index) in mgYcList" @click="mgYc(index)"><div :class="`fang my-check ${watchStatus? 'dis' : ''} ${item.check&&!watchStatus? 'check' : ''}`"></div>{{item.text}}</li>
        </ul>
      </div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span> 明日是否准备带餐</div>
      <div @click="dinnerEat=true" class="item wd van-hairline--bottom"><div :class="`my-check ${dinnerEat? 'check' : ''}`"></div>是</div>
      <div @click="dinnerEat=false" class="item wd van-hairline--bottom"><div :class="`my-check ${!dinnerEat? 'check' : ''}`"></div>否</div>
      <div class="item wd wd-num van-hairline--bottom">
        <div style="display:flex;align-items: center" @click="lunchEat=true"><div :class="`my-check ${dinnerEat? 'dis' : ''} ${lunchEat&&!dinnerEat? 'check' : ''}`"></div><span>需要预定明日午餐</span></div>
      </div>
      <div class="item wd wd-num van-hairline--bottom">
        <div style="display:flex;align-items: center" @click="lunchEat=false"><div :class="`my-check ${dinnerEat? 'dis' : ''} ${!lunchEat&&!dinnerEat? 'check' : ''}`"></div><span>不需要预定明日午餐</span></div>
      </div>
    </div>
    <div class="wrap">
      <div class="item title van-hairline--bottom"><span class="red">*</span> 出行</div>
      <div @click="tripType=1" class="item wd van-hairline--bottom"><div :class="`my-check ${tripType===1? 'check' : ''}`"></div>我开车上班</div>
      <div  class="item wd van-hairline--bottom btn-wrap child"><div @click="isSfc = !isSfc" style="display: flex;align-items: center"><div :class="`my-check ${tripType!==1? 'dis' : ''} ${isSfc&&tripType===1? 'check' : ''}`"></div><span>愿意提供顺风车服务</span></div> <div @click="goAdd" class="btn">填写相关信息</div></div>
      <div   @click="tripType=2" class="item wd van-hairline--bottom btn-wrap"><div style="display: flex;align-items: center;"><div :class="`my-check ${tripType===2? 'check' : ''}`"></div><span>我要搭车</span></div> <div class="btn" @click="goRoad">去搜索谁跟我顺路</div></div>
      <div @click="tripType=3" class="item wd van-hairline--bottom"><div :class="`my-check  ${tripType===3? 'check' : ''}`"></div>其它方式</div>
    </div>
    <div class="bottom" @click="submit">提交</div>
  </div>
</template>

<script>
import vue from 'vue';
import { Button,Toast, Checkbox, CheckboxGroup} from 'vant';
import {getUrlParam} from '../utils/auth'
import dayjs from 'dayjs'
import { inviteeList,inviteeLock ,inviteeCommit,enableEvatation, carAdd} from '@/api/user'
vue.use(Button).use(Toast).use(Checkbox).use(CheckboxGroup);
export default {
  name: 'home',
  components: {

  },
    data(){
      return{
        userInfo: {},
        checked:true,
        isSfc: true,
        now: dayjs().format('YYYY-MM-DD'),
        watchTemp: '',// 天罡温度
        watchStatus: true, // 天罡状态,
        homeTemp: '', // 在家温度
        homeStatus: true, // 在家状态0异常，1正常
        lunchEat: true, //  是否吃午餐0否1是,
        lunchAddr: '总部', // 午餐就餐点（总部、国创）
        dinnerEat: true, //是否吃晚餐0否1是
        dinnerAddr: '总部', // 晚餐就餐点（总部、国创）
        tripType: 1,//出行方式（1我开车上班、2我要搭车、3其他方式））
        ycList: [{text: '咳嗽', check: false}, {text: '发烧', check: false}, {text: '胸痛', check: false}, {text: '其他', check: false}],
        mgYcList: [{text: '咳嗽', check: false}, {text: '发烧', check: false}, {text: '胸痛', check: false}, {text: '其他', check: false}]
      }
    },
    methods:{
      submit() {
        let list1 = this.ycList.filter(item => {
          return item.check;
        });
        let list2 = this.mgYcList.filter(item => {
          return item.check;
        });
        let str1 = list1.map(item => {
          return item.text;
        });
        let str2 = list2.map(item => {
          return item.text;
        });
        if ((!this.homeStatus)&&this.homeTemp === '') {
          Toast('请输入在家体温')
        } else if ((!this.watchStatus)&&this.watchTemp === '') {
          Toast('请输入门岗体温')
        } else {
          carAdd({
            unionId: localStorage.id,
            homeTemp: this.homeTemp|| '37.3',
            homeStatus: str1.join(','),
            watchTemp: this.watchTemp || '37.3',
            watchStatus: str2.join(','),
            lunchEat: this.lunchEat ? 0: 1,
            lunchAddr: '国创',
            dinnerEat: this.dinnerEat ? 1: 0,
            dinnerAddr: '国创',
            tripType: this.tripType === 1 ? "我开车上班" : (this.tripType === 2 ? '我要搭车' : '其他方式')
          })
        }

      },
      yc(index) {
        if (this.homeStatus) return;
        this.ycList[index].check = !this.ycList[index].check;
      },
      mgYc(index) {
        if (this.watchStatus) return;
        this.mgYcList[index].check = !this.mgYcList[index].check;
      },
      goAdd() {
        this.$router.push('/addCar');
      },
      goRoad() {
        this.$router.push('/road');
      }
    },
    mounted(){
        // (process.env.VUE_APP_LOGIN_REDIRECT_URL===window.location.href)
        //this.createDDurl()
        this.code=getUrlParam('code');
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
        display: flex;
        align-items: center;
        span{
          color: #666666!important;
        }
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
