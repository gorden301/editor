import FormGenerator from './index.vue'

FormGenerator.install = function (Vue) {
  Vue.component(FormGenerator.name, FormGenerator)
}

export default FormGenerator
