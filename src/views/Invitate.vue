<template>
  <div class="invitate">
    <titleBar>
      <!--<div slot="left" @click="goback"><svg-icon icon-class="back" /> 返回</div>-->
      <div slot="title">邀请考评人</div>
        <div slot="right" class="progress-icon">
          <router-link :to="{ name: 'Progress'}">
          <svg-icon icon-class="progress"/>
          </router-link>
        </div>
    </titleBar>
    <div class="rules">
      <ul>
        <li class="li-title" style="text-align: center">当前登录人：{{ userName }}</li>
        <li class="li-title">规则说明</li>
        <li>考评人：云平台事业部已转正同学</li>
        <li>如何邀请考评人：由被考评人邀请5位考评人为其打分，每位考评人最多对5位被考评人打分，其中1-2人需要是同组同学，3-4人需要是协同组同学。</li>
        <li><i class="redTip">主动就是机会，时间就是金钱！</i></li>
      </ul>
      <div class="circle-cnt">
        <div>已选</div>
        <div>{{ selfTeamresult.length+partnerTeamresult.length}}/5</div>
      </div>
    </div>
    <div>
      <p class="boldText">选择<span v-show="toPartner">协</span>同组同学</p>
      <div class="person-list">
         <!-- <span v-show="item.status===1"><svg-icon icon-class="check"/></span>
          <span v-show="item.status===0"><svg-icon icon-class="check2"/></span>-->
          <van-checkbox-group v-model="selfTeamresult" v-if="!toPartner" @change="changeCheckSelf">
            <div class="person" v-for="(item, index) in (selfTeam)" :key="item.studentId">
            <van-checkbox checked-color="#07c160" icon-size="28px" v-if="item.status"
                    :name="item.studentId"
                    :key="item.studentId"
                    @click="lockInvitate(item.lock,item.studentId,checkStudent)">
              {{ item.studentName }}
            </van-checkbox>
              <van-checkbox checked-color="#07c160" icon-size="28px"
                            v-if="!item.status"
                            :name="item.studentId"
                            :key="item.studentId"
                            :disabled="!item.status">
                {{ item.studentName }}
              </van-checkbox>
            </div>
          </van-checkbox-group>
        <van-checkbox-group v-model="partnerTeamresult" v-if="toPartner" @change="changeCheckpart">
          <div class="person" v-for="(item, index) in (partnerTeam)" :key="item.studentId">
            <van-checkbox checked-color="#07c160" icon-size="28px" v-if="item.status"
                          :name="item.studentId"
                          :key="item.studentId"
                          @click="lockInvitate(item.lock,item.studentId,checkStudent)">
              {{ item.studentName }}
            </van-checkbox>
            <van-checkbox checked-color="#07c160" icon-size="28px" v-if="!item.status"
                          :name="item.studentId"
                          :key="item.studentId"
                          :disabled="!item.status">
              {{ item.studentName }}
            </van-checkbox>
          </div>
        </van-checkbox-group>
      </div>
    </div>
    <div class="buttons">
      <van-button type="info" size="small" style="width:40%;margin-bottom: 0.5em" @click="toPartner=!toPartner">选择<span v-show="!toPartner">协</span>同组同学</van-button>
      <van-button  type="info"  size="small" style="width:40%;margin-left: 1em" v-if="isOver+''!=='1'"
                   :disabled="!(selfTeamresult.length+partnerTeamresult.length===5)" @click="commitInvitate">邀请</van-button>
      <van-button type="info" size="small" style="width:40%;margin-left: 1em" @click="routerGo('Evaluation')" v-else>去考评</van-button>
    </div>
  </div>
</template>
<script>
  import vue from 'vue'
  import titleBar from '@/components/titleBar.vue'
  import { Button,Checkbox,CheckboxGroup ,Toast } from 'vant'
  import { inviteeList,inviteeLock ,inviteeCommit,enableEvatation} from '@/api/user'
  import {getToken} from '@/utils/auth'
  import collect from 'collect.js'
  vue.use(Button).use(Checkbox).use(CheckboxGroup).use(Toast)
	export default {
		name: 'Invitate',
        components:{
			titleBar
        },
        data(){
			return{
				isLock:false,
				checkStudent:false,
				partnerTeamresult:[],
				selfTeamresult:[],
				inloading:true,
				isFull:false,
				toPartner:false,
				selfTeam:[],
				partnerTeam:[],
				isOver:'',
				userName:''
            }
        },
        methods:{
			lockInvitate(lock,studentId,checked){
				console.log('item.lock',lock,checked);
				this.checkStudent=lock+''==='0'?1:0;
				inviteeLock({
					studentId:studentId,
					userId:getToken(),
					lock:+(!lock)//0解锁 1锁定
				}).then(res=>{
					if(res.code==='200'){
						//刷新列表
                        this.getInviteeList()
                    }else{
						Toast.fail(res.text);
						//刷新列表
						this.getInviteeList()
                    }
				},err=>{
					Toast.fail(err.text);
					//刷新列表
					this.getInviteeList()
                })
            },
			changeCheckpart(values){
				console.log('--change--',values)
				this.partnerTeamresult=values;
            },
			changeCheckSelf(values){
				console.log('--change--',values)
				this.selfTeamresult=values;
			},
			goback(){
				this.$router.back();
			},
			routerGo(path){
				this.$router.push(path)
			},
			getInviteeList(){
				inviteeList({userId:getToken()}).then(res=>{
					if(res.code==='200'){
						let selfTeam=res.data.selfTeam;
						this.partnerTeam=res.data.partnerTeam;
						this.selfTeam=res.data.selfTeam;
						// this.toPartner = !((selfTeam&&selfTeam.length&&collect(selfTeam).max('cnt')!==0)||selfTeam.length!==0);
						let partnerTeamChecked=this.partnerTeam.map(item=>{
							if(item.lock){
								return item.studentId
							}
						});
						let selfTeamChecked=this.selfTeam.map(item=>{
							if(item.lock){
								return item.studentId
							}
						});
						this.partnerTeamresult=partnerTeamChecked.filter(item=>{
							if(item){
								return item
							}
						});
						this.selfTeamresult=selfTeamChecked.filter(item=>{
							if(item){
								return item
							}
						});
                    }else{
						Toast(res.text)
                    }
				},err=>{
					Toast(err.text)
                })
            },
			enableInvitate(userId){
				enableEvatation({userId:userId}).then(res=>{
					if(res.code==='200'){
						console.log(res.data)
						localStorage.setItem('invitateOver',res.data);
						res.data+''==='1'?this.$router.replace({path:'/Evaluation',params:{'enable':res.data,'userId':userId}}):this.$router.replace({path:'/Invitate',params:{'enable':res.data,'userId':userId}});
					}else{
						Toast(res.text)
					}
				},err=>{
					Toast(err.text)
				})
			},
			commitInvitate(){
				inviteeCommit({userId:getToken()}).then(res=>{
					if(res.code==='200'){
						Toast('已成功邀请');
						this.$router.push('/Evaluation');
						localStorage.setItem('invitateOver','1');
						this.isOver='1';
                    }else{
						Toast(res.text)
                    }
                },err=>{
					Toast(err.text)
                })
            }
        },
		mounted () {
			this.isOver=localStorage.getItem('invitateOver');
			this.userName=localStorage.getItem('userName');
			/*localStorage.removeItem('invitateOver');
			localStorage.removeItem('userName')*/
			this.getInviteeList()
        },
	};
</script>

<style>
  .invitate{
    height: 100%;
    background-color: #fff;
  }
  .invitate .person-list{
    height: 20em;
    padding-bottom: 1em;
    overflow: auto;
  }
.invitate .progress-icon{
  font-size: 1.32em;
}
 .invitate  .rules{
    font-size: 12px;
    text-align: left;
    background-color: #fff;
    border-bottom: 1px solid #d2d2d2;
    position: relative;
  }
  .invitate .rules ul{
    margin: 0;
    padding: 1em 2em;
  }
 .invitate .li-title{
    list-style: none;
    font-weight: bold;
   font-size: 14px;
  }
 .invitate li .redTip{
    color: orangered;
  }
 .invitate .boldText{
    font-weight: bold;
   margin: 0;
   padding: 1em;
  }
 .invitate .fontGray{
    color: rgba(175, 175, 175, 0.82);
  }
 .invitate .person{
    display: inline-block;
    width: 22%;
    text-align: center;
   padding-left: 4px;
  }
 .invitate .person .van-checkbox{
   justify-content: flex-start;
 }
 .invitate .buttons{
    /*position: absolute;
    left: 0;
    right: 0;
    bottom: 20px;*/
  }
.invitate .van-checkbox{
  justify-content: center;
}
 .invitate .circle-cnt{
    display: inline-flex;
    height:60px;
    width: 60px;
    border-radius: 50%;
    background: #1989fa;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    right: 6px;
    text-align: center;
    bottom: -25%;
    color: #fff;
  }
</style>