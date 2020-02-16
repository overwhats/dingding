<template>
	<div class="evalutation">
		<scrollList ref="evaluationList" :loadMore="false" :bounce="false">
			<div slot="defaultScroll">
				<titleBar>
					<div slot="left" @click="goback">
						<svg-icon icon-class="back"/>
						返回
					</div>
					<div slot="title">考评</div>
					<div slot="right" class="progress-icon" @click="routerGo">
						<svg-icon icon-class="progress"/>
					</div>
				</titleBar>
				<div class="rules">
					<ul>
						<li class="li-title" style="text-align: center">当前登录人：{{ userName }}</li>
						<li class="li-title">规则说明</li>
						<li>每位考评人根据被考评人的积极性、协作性、责任心、沟通能力、专业技能5各方面给被考评人评分，5位被评分人分数需拉开挡位。规则如下：</li>
						<li><span>90 - 110分</span>
							<div>最多1人</div>
						</li>
						<li><span>70 - 89分</span>
							<div>2人以上</div>
						</li>
						<li><span>70分以下</span>
							<div>最少1人</div>
						</li>
						<li><i class="redTip">考评分数与评价为匿名提交，被考评人无法查看</i></li>
					</ul>
				</div>
				<div>
					<div class="levels">
						<p class="noBr">90 - 110分：<span>{{ highScore.length }}</span></p>
						<p class="noBr">70 - 89分：<span>{{ middleScore.length }}</span></p>
						<p>70分以下：<span>{{ lowScore.length }}</span></p>
					</div>
					<div class="scoreBox" v-for="(item,index) in evaList" :key="index">
						<van-field :label="item.studentName" label-width="240px" required
								   :value="item.score" type="number"  class="nameLine"
								   :disabled="(!item.studentId)||(item.studentId&&item.score>0)"
								   @input="(value)=>getScore(value,item.studentId)"
						@blur="scrollResize">
							<van-button slot="button" size="mini" type="info"  :disabled="(!item.studentId)||(item.studentId&&item.score>0)" @click="commitScore(item.studentId)">提交</van-button>
						</van-field>
						<van-field
								:value="item.comments"
								type="textarea"
								placeholder="请输入评语"
								rows="3"
								required
								autosize
								@input="(value)=>getComment(value,item.studentId)"
								:disabled="(!item.studentId)||(item.studentId&&item.score>0)"
								@blur="scrollResize"
						/>
					</div>
				
				</div>
			</div>
		</scrollList>
	</div>
</template>
<script>
	import vue from 'vue';
	import titleBar from '@/components/titleBar.vue';
	import { Button, Checkbox, CheckboxGroup, Field ,Toast,Dialog } from 'vant';
	import {evaluteList,evaCommit } from '@/api/user'
	import collect from 'collect.js'
	import {getToken} from '@/utils/auth'
	import scrollList from '@/components/list';
	vue.use(Button).use(Checkbox).use(CheckboxGroup).use(Field);
	export default {
		name: 'Evaluation',
		components: {
			titleBar,
			scrollList
		},
		data () {
			return {
				score:{},
				comment:{},
				scoreGroup:[],
				middleScore:[],
				highScore:[],
				lowScore:[],
				result: [ 1, 3 ],
				inloading: true,
				isFull: false,
				evaList:[],
				userName:''
			};
		},
		methods: {
			goback(){
				this.$router.back();
			},
			routerGo(){
				this.$router.push('/Progress')
			},
			scrollResize(){
				window.scroll(0,0);
			},
			beforeClose(action, done,studentId){
				if (action === 'confirm') {
				
				} else {
					done();
				}
			},
			commitScore(studentId){
				Dialog.confirm({
					title: '评分',
					message: '确认给这位同学打'+this.score[studentId]+"分？",
				}).then(() => {
					evaCommit({
						userId:getToken(),
						evaluateId:studentId,
						score:this.score[studentId],
						comments:this.comment[studentId]
					}).then(res=>{
						if(res.code==='200'){
							Toast.success('提交成功');
							this.getEvaList()
						}else{
							Toast.fail(res.text)
						}
					},err=>{
						Toast.fail(err.text)
					})
				}).catch(() => {
					// on cancel
				});
			},
			getScore(value,id){
				console.log(id)
				this.score[id]=value;
				console.log(value,this.score)
			},
			getComment(value,id){
				this.comment[id]=value;
			},
			getEvaList(){
				evaluteList({userId:getToken()}).then(res=>{
					if(res.code==='200'){
						let evaluateList=res.data.evaluateList;
						this.evaList = res.data.evaluateList;
						let s=[],a=[],c=[];
						this.scoreGroup=collect(evaluateList).pluck('score').all().filter(item=>{
							if(item){return item}
						});
						this.scoreGroup.map(item=>{
							if(item<110&&(item>=90)){
								s.push(item)
								this.highScore=s
							}else if(item<=89&&(item>=70)){
								a.push(item)
								this.middleScore=a
							}else if(item<70){
								console.log('1111',item)
								c.push(item)
								this.lowScore=c
							}
						});
						this.initScroll();
						console.log(this.lowScore)
					}else{
						Toast(res.text)
					}
				},err=>{
					Toast(err.text)
				})
			},
			initScroll () {
				this.$nextTick(() => {
					this.$refs.evaluationList && this.$refs.evaluationList._initComponent();
				});
			},
		},
		mounted () {
			this.userName=localStorage.getItem('userName');
			this.getEvaList()
		}
	};
</script>

<style lang="scss">
	.evalutation{
		height: 100%;
		overflow:auto;
	}
	.evalutation .progress-icon {
		font-size: 1.32em;
	}
	
	.evalutation .rules {
		font-size: 12px;
		text-align: left;
		background-color: #fff;
		position: relative;
	}
	
	.evalutation .rules ul {
		margin: 0;
		padding: 1em 2em;
	}
	
	.evalutation .rules li > div {
		display: inline-block;
		width: 70px;
		text-align: right;
	}
	
	.evalutation .rules li > span {
		display: inline-block;
		width: 70px;
		text-align: left;
	}
	
	.evalutation .li-title {
		list-style: none;
		font-weight: bold;
		font-size: 14px;
	}
	
	.evalutation li .redTip {
		color: orangered;
	}
	
	.evalutation .boldText {
		font-weight: bold;
	}
	
	.evalutation .fontGray {
		color: rgba(175, 175, 175, 0.82);
	}
	
	.evalutation .person {
		display: inline-block;
		width: 25%;
		text-align: center;
	}
	
	.evalutation .buttons {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 20px;
	}
	
	.evalutation .van-checkbox {
		justify-content: center;
	}
	.evalutation .levels{
		background-color: #fff;
	}
	.evalutation .levels > p {
		display: inline-block;
		padding: 8px;
		margin: 0 0 10px 0;
		border: 1px solid #d2d2d2;
		font-size: 12px;
	}
	
	.evalutation .levels .noBr {
		border-right: none;
	}
	.evalutation .nameLine{
		border-bottom: 1px solid #aaa;
	}
	.evalutation .nameLine .van-field__control{
		width: 40px;
		border: 1px solid #d2d2d2;
		font-size: 12px;
		border-radius: 4px;
		box-sizing: border-box;
		height: 2em;
		box-shadow: none;
	}
	.evalutation .nameLine .van-field__body{
		justify-content: space-between;
	}
	.evalutation .nameLine .van-field__label{
		text-align: left;
	}
	.evalutation .nameLine .van-field__body .van-field__button{
		display: inline-flex;
		align-items: center;
	}
	.evalutation .scoreBox{
		border-top: 6px solid #efefef;
	}
	.evalutation .scoreBox .van-field__button{
		height: 2em;
	}
	.evalutation .scoreBox .van-field__button .van-button--mini{
		height: 100%;
	}
	.evalutation .scoreBox .van-cell{
		font-size: 12px;
	}
	.evalutation .circle-cnt {
		display: inline-flex;
		height: 60px;
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