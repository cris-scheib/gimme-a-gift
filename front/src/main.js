import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import moment from 'moment'

require('./assets/css/custom.css');
const api = axios.create({
    baseURL: `http://${process.env.VUE_APP_API_URL}:${+process.env.VUE_APP_API_PORT}/api/`,
})

api.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
             localStorage.clear()
             router.replace({ path: '/login' })
        } else {
            return Promise.reject(error.response.data)
        }
    }
)
Vue.prototype.moment = moment
Vue.api = Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
    router,
    render: h => h(App),
    history,
}).$mount('#app')