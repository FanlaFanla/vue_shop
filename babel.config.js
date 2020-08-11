// 这是项目发布阶段需要用到的 babel 插件
const prodPlugins = []
    // process.env.NODE_ENV 可以获取到vue编译时的环境
    // production是发布模式  development是开发模式
if (process.env.NODE_ENV === 'production') {
    prodPlugins.push('transform-remove-console')
}
module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    plugins: [
        [
            'component',
            {
                libraryName: 'element-ui',
                styleLibraryName: 'theme-chalk'
            }
        ],
        // 新增下列代码，使用插件
        // 该操作使开发模式的全部console移除
        // ['transform-remove-console']

        // 发布产品时候的插件
        ...prodPlugins,
        // 路由懒加载插件
        '@babel/plugin-syntax-dynamic-import'
    ]
}