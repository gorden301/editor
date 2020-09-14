<template>
  <div id="app">
    <XdPageEditor
      :ext-list="externalComponents"
      type="form"
    />
  </div>
</template>

<script>
import { XdPageEditor } from '../packages/index'
export default {
  name: 'App',
  components: {
    XdPageEditor
  },
  data () {
    return {
      externalComponents: [
        {
          type: 'external',
          category: 'basic',
          name: '外挂组件示例',
          component: () => import('./components/hello.vue'),
          icon: 'icon-input',
          props: {
            placeholder: '',
            defaultValue: '',
            disabled: false,
            id: '',
            maxLength: 0
          },
          style: {
          },
          class: {
          },
          attrs: {
          },
          on: {
          },
          nativeOn: {
          },
          options: {
            required: false,
            dataType: 'string',
            pattern: ''
          }
        }
      ]
    }
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
#app {/* stylelint-disable-line */
  height: 100%;
}
</style>
