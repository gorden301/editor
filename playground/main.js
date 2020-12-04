if (window && window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
  }
import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Editor from '../packages/utils/editor'
Vue.use(antd)
window.Editor = Editor
let instance = null
Vue.config.productionTip = false
function render() {
    instance = new Vue({
        render: h => h(App)
    })
    instance.$mount("#app")
}
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}
export async function bootstrap() { }
export async function mount(props) {
    console.log('========>接受props', props)
    if(props.formEditorConfig) {
        window.formProps = props.formEditorConfig
        window.Editor.addPlugin(props.formEditorConfig.pluginList)
    }
    render(props);
    
}

export async function unmount() {
    instance.$destroy();
    instance = null;
}
// new Vue({
//     render: h => h(App)
// }).$mount('#app')
