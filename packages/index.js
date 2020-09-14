import Vue from 'vue'
// import XDAppUI from 'xdapp-ui'
import XdPageEditor from './Editor'
// import XdPageGenerator from './Generator'
import merge from 'deepmerge'
Vue.prototype.$merge = merge
// Vue.use(XDAppUI)
const components = [XdPageEditor]
const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  components.map(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export {
  XdPageEditor
  // XdPageGenerator
}
export default {}
