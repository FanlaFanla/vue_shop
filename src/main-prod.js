import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import TreeTable from 'vue-table-with-tree-grid'

// 发布模式采用CDN加载elementUI
// import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 最后项目优化时删除内部引用，采用CDN形式
// 导入富文本编辑器对应的样式
// import 'quill/dist/quill.core.css' // import styles
// import 'quill/dist/quill.snow.css' // for snow theme
// import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入页面加载进度条nprogress对应的js和css
import NProgress from 'nprogress'

// 最后项目优化时删除内部引用，采用CDN形式
// import 'nprogress/nprogress.css'

// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    // 在request拦截器中展示页面加载进度条 NProgress.start()
    // 为每个数据请求自动添加token
axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

// 在response拦截器中隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册组件
Vue.component('tree-table', TreeTable)
    // 将富文本编辑器注册为全局可用的组件
Vue.use(VueQuillEditor)

// 日期格式化函数组件
Vue.filter('dateFormat', function (originVal) {
    const dt = new Date(originVal)
    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    // yyyy-mm-dd hh:mm:ss
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
