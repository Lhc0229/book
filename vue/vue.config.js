module.exports={
    publicPath:'./',//配置根目录
    outputDir:'dist',//构建输出目录
    assetsDir:"assets",//静态资源目录（js,css,image）
    lintOnSave:false, //是否开启eslint检测,false不开启，有效值：true || false
    productionSourceMap: true,//生成环境下面开启sourceMap支持断点调试
    configureWebpack:{
        devtool: 'source-map' //配置开发者环境的sourceMap用于断点调试
    }
};