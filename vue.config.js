const path = require('path')
console.log(process.env.VUE_APP_SERVER_URL);
function resolve(dir) {
	return path.join(__dirname, './', dir)
}

module.exports = {
	productionSourceMap:process.env.NODE_ENV ==='production'?false:true,
	outputDir:process.env.outputDir,//打包输出目录
	devServer:{
	proxy:{
		'/api':{
			target:process.env.VUE_APP_SERVER_URL,
			changeOrigin:true,
			ws:false,
			pathRewrite:{
				'^/api':''
			}
		}
	}
	},
	chainWebpack: config => {
		// svg loader
		const svgRule = config.module.rule('svg') // 找到svg-loader
		svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
		svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
		svgRule // 添加svg新的loader处理
			.test(/\.svg$/)
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
		
		// 修改images loader 添加svg处理
		const imagesRule = config.module.rule('images')
		imagesRule.exclude.add(resolve('src/icons'))
		config.module
			.rule('images')
			.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
		
		// css配置
		
	}
}
