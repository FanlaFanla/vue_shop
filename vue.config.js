// vue.config.js是配置webpack的配置文件
module.exports = {
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            // 清空默认打包入口，使用自定义打包入口
            config
                .entry('app')
                .clear()
                .add('./src/main-prod.js')

            // 配置CDN加载项
            config.set('externals', {
                vue: 'Vue',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor',
                'vue-router': 'VueRouter'
            })

            // 新增属性作为主页title判断
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })

        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')

            // 新增属性作为主页title判断
            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}