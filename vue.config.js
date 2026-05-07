// const { defineConfig } = require('@vue/cli-service')
// let prodPublicPath = "./"
// let devPublicPath = ''
// let publicPath= './'
// if(process.env.NODE_ENV === 'production'){//生产环境
//   publicPath=prodPublicPath
// }else{//开发环境
//   publicPath=devPublicPath
// }
// module.exports = defineConfig({
//   transpileDependencies: true,
//   publicPath
// })
 

// module.exports = {
//   css: {
//     // 是否使用css分离插件 ExtractTextPlugin
//     extract: true,
//     // 开启 CSS source maps?
//     sourceMap: false,
//     // css预设器配置项
//     loaderOptions: {},
//     // 启用 CSS modules for all css / pre-processor files.
//     modules: false
//   },
//   publicPath,
//   assetsDir:"",
//   productionSourceMap:false,
//   filenameHashing:false
// }


let prodPublicPath = '/Apriso/Portal/VueProject/QualityInspection/'
let devPublicPath = ''
let publicPath= ''
// prodPublicPath=''
if(process.env.NODE_ENV === 'production'){//生产环境
  publicPath=prodPublicPath
}else{//开发环境
  publicPath=devPublicPath
}
module.exports = {
  publicPath, 
  assetsDir:"",
  productionSourceMap:false,
  filenameHashing:false
}
 