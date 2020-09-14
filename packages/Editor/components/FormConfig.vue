<template>
  <a-form-model>
    <a-form-model-item label="表单布局">
      <a-radio-group v-model="data.layout">
        <a-radio-button value="horizontal">
          水平
        </a-radio-button>
        <a-radio-button value="vertical">
          垂直
        </a-radio-button>
        <a-radio-button value="inline">
          行内
        </a-radio-button>
      </a-radio-group>
    </a-form-model-item>

    <a-form-model-item label="标签对齐方式">
      <a-radio-group v-model="data.labelAlign">
        <a-radio-button value="left">
          左对齐
        </a-radio-button>
        <a-radio-button value="right">
          右对齐
        </a-radio-button>
      </a-radio-group>
    </a-form-model-item>

    <a-form-model-item
      v-if="data.layout !== 'inline'"
      label="表单字段宽度"
    >
      <a-input-number
        v-model="data.labelCol"
        :min="0"
        :max="12"
      />
    </a-form-model-item>

    <a-form-model-item label="组件尺寸">
      <a-radio-group v-model="data.size">
        <a-radio-button value="">
          default
        </a-radio-button>
        <a-radio-button value="medium">
          medium
        </a-radio-button>
        <a-radio-button value="small">
          small
        </a-radio-button>
        <a-radio-button value="mini">
          mini
        </a-radio-button>
      </a-radio-group>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: Object
    }
  }
}
</script>
