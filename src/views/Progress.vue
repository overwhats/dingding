<template>
  <div class="progress">
    <scrollList ref="progressList" :loadMore="false" :bounce="false">
      <div slot="defaultScroll">
      <titleBar>
        <div slot="left" @click="goback"><svg-icon icon-class="back" /> 返回</div>
        <div slot="title">环评进度</div>
      </titleBar>
      <div class="rules">
        <ul>
          <li class="li-title" style="text-align: center">当前登录人：{{ userName }}</li>
          <li class="li-title">个人进度</li>
          <li class="space-hr">已邀请的考评人员：{{ this.selfProcess.inviteeList&&this.selfProcess.inviteeList.join('、')}}</li>
          <li>需考评人员：{{ this.selfProcess.assesseeList&&this.selfProcess.assesseeList.join('、') }}</li>
          <li class="space-hr">待考评人员：{{ this.selfProcess.unassesseeList&&this.selfProcess.unassesseeList.join('、') }}</li>
          <li><span>您还需邀请：</span><span>{{ this.selfProcess.inviteeCnt }}人</span></li>
          <li><span>您还需等待被邀请：</span><span>{{ this.selfProcess.assesseeWaitCnt }}人</span></li>
          <li><span>您还需考评：</span><span>{{ this.selfProcess.unassesseeCnt }}人</span></li>
        </ul>
      </div>
      <div class="rules">
        <ul>
          <li class="li-title">总体进度</li>
          <li class="">邀请进度：已邀请人数/总需邀请人数</li>
          <li class="">考评进度：已考评人数/被邀请考评人数/总需考评人数</li>
      
          <li class="personProgress" v-for="item in teamProcess" :key="item.name"><span>{{ item.name }}</span><div class="number"><span>邀请：{{ item&&item.inviteeInfo.join('/') }}</span><span>考评：{{ item&&item.assesseeInfo.join('/') }}</span></div></li>
    
        </ul>
      </div>
      </div>
    </scrollList>
  </div>
</template>
<script>
  import titleBar from '@/components/titleBar.vue'
  import {progressInfo} from '@/api/user'
  import {getToken} from '@/utils/auth'
  import scrollList from '@/components/list';
	export default {
		name: 'Progress',
        components:{
			titleBar,
			scrollList
        },
        data(){
			return{
				checked:false,
				result:[1,3],
				inloading:true,
				isFull:false,
				selfProcess:{
					inviteeList:['---'],
					assesseeList:['---'],
					unassesseeList:['---'],
					inviteeCnt:'---',
					assesseeWaitCnt:'---',
					unassesseeCnt:'---'
                },
				teamProcess:[],
				userName:''
            }
        },
        methods:{
			goback(){
				this.$router.go(-1);
            },
			initScroll () {
				this.$nextTick(() => {
					this.$refs.progressList && this.$refs.progressList._initComponent();
				});
			},
        },
		mounted () {
			this.userName=localStorage.getItem('userName');
			progressInfo({userId:getToken()}).then(res=>{
				this.selfProcess=res.data.selfProcess;
				this.teamProcess= res.data.teamProcess;
				this.initScroll();
            })
            
        },
	};
</script>

<style scoped lang="scss">
.progress{
    height: 100%;
    background-color: #fff;
   overflow-y: auto;
}
.progress .space-hr{
  padding-bottom: 20px;
}
.progress .personProgress{
  display: flex;
  text-align: center;
  padding: 6px;
  margin-top: 6px;
  border-top: 4px solid #eee;
}
.progress .personProgress>span{
  display: inline-block;
  width: 60px;
}
.progress .personProgress .number{
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.progress  .rules{
      font-size: 12px;
      text-align: left;
      background-color: #fff;
      position: relative;
  }
 .progress .rules ul{
    margin: 0;
    padding: 1em 1em;
  }
.progress .rules li{

}
.progress .rules .li-title{
    list-style: none;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    margin-bottom: 8px;
  }
</style>