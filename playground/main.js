import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(antd)
let instantce = null
Vue.config.productionTip = false
function render() {
    instantce = new Vue({
        render: h => h(App)
    }).$mount('#app')
}
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
export async function bootstrap() { }
export async function mount(props) {
    console.log(props);
    render(props);
}

export async function unmount() {
    instance.$destroy();
    instance = null;
}
// new Vue({
//     render: h => h(App)
// }).$mount('#app')
