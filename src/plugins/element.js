import Vue from 'vue'
import { Form, FormItem, Input, Message, Button} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message //弹框组件通过this可以访问