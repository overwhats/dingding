<template>
	<div :style="`background-color: ${bgColor};`" class="font-color title-box">
		<div class="left">
			<slot name="left" ></slot>
		</div>
		<div class="left title">
			<slot name="title" ></slot>
		</div>
		<div class="right">
			<slot name="right" ></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'titleBar',
		props:{
			bgColor:{
				type:String,
				default:'#2c2c2c'
			}
		}
	};
</script>

<style scoped>
	.font-color{
		color:#fff;
	}
	.clear{
		clear: both;
	}
	.left{
		
		display: inline-block;
	}
	.right{
		
		display: inline-block;
	}
	.title{
		transform: translateX(-50%);
		position: absolute;
		left: 50%;
	}
	.title-box{
		padding: 8px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>