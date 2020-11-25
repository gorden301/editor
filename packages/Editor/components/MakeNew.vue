<!-- 我的页面 -->
<template>
    <a-modal v-model="diaVisible" title="新建组件" @ok="handleOk" width="70%">
        <a-form-model
            v-model="formObj"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
            <a-form-model-item label="分组名称">
                <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item label="分组描述">
                <a-input v-model="form.description" />
            </a-form-model-item>
            <a-form-model-item v-if="form.type !== 'form'" label="绑定数据key">
                <a-input v-model="form.model" />
            </a-form-model-item>
            <a-form-model-item label="分组类型">
                <div>
                    <a-radio-group v-model="form.type" button-style="solid">
                        <a-radio-button value="form">表单</a-radio-button>
                        <a-radio-button value="对话框">对话框</a-radio-button>
                        <a-radio-button value="通知提醒框"
                            >通知提醒框</a-radio-button
                        >
                    </a-radio-group>
                </div>
                <template v-if="form.type == '对话框'">
                    <div style="display: flex; align-items: center">
                        <div style="width: 60px">标题</div>
                        <a-input v-model="form.title" />
                    </div>
                    <div style="display: flex">
                        <div style="width: 60px">值</div>
                        <a-select v-model="jsType" style="width: 120px">
                            <a-select-option value="String"
                                >String</a-select-option
                            >
                            <a-select-option value="Number"
                                >Number</a-select-option
                            >
                            <a-select-option value="Boolean"
                                >Boolean</a-select-option
                            >
                        </a-select>
                        <a-input
                            v-if="jsType == 'String'"
                            v-model="form.finalValue"
                        />
                        <a-input-number
                            v-if="jsType == 'Number'"
                            :step="1"
                            v-model="form.finalValue"
                        />
                        <a-radio-group
                            v-if="jsType == 'Boolean'"
                            v-model="form.finalValue"
                        >
                            <a-radio :value="true">true</a-radio>
                            <a-radio :value="false">false</a-radio>
                        </a-radio-group>
                    </div>
                    <div style="display: flex; align-items: center">
                        <span style="width: 60px">显示遮罩</span>
                        <a-radio-group v-model="form.mask">
                            <a-radio :value="true">是</a-radio>
                            <a-radio :value="false">否</a-radio>
                        </a-radio-group>
                    </div>
                </template>
                <template v-if="form.type == 'form'">
                    <div style="display: flex; align-items: center">
                        <div style="width: 60px">表单key</div>
                        <a-input v-model="form.key" />
                    </div>
                </template>
            </a-form-model-item>
        </a-form-model>
    </a-modal>
</template>

<script>
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
        arrLength: [Number, String]
    },
    data() {
        // 这里存放数据
        return {
            jsType: "String",
            diaVisible: false,
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
            form: {
                key: '',
                name: "",
                description: "",
                model: "",
                value: "",
                type: "form",
                finalValue: "",
                title: "",
                mask: true,
            },
        };
    },
    // 监听属性 类似于data概念
    computed: {
        formObj: {
            get() {
                return this.form;
            },
            set(obj) {
                this.form = obj;
            },
        },
    },
    // 监控data中的数据变化
    watch: {},
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, // 生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
    // 方法集合
    methods: {
        handleOk() {
            if(!this.form.key) {
                this.$message.error('表单Key必填！');
                return
            }
            this.diaVisible = false;
            if(this.form.type == 'form') {
                this.$emit("addMap", {
                    keyName: this.form.key,
                    list: [],
                    type: this.form.type,
                    curIndex: Number(this.arrLength),
                    props: {
                        conditionConfig: {
                            allowCondition: false,
                            type: 'and',
                            conditions: []
                        },
                    }
                })
            }
            // this.structures.push(this.formObj);
        },
        addStructure() {
            this.mainActive = false;
            this.diaVisible = true;
            this.formObj = {
                name: "",
                description: "",
                model: "",
                value: "",
                type: "对话框",
                finalValue: "",
                title: "",
                mask: true,
                treeData: [
                    {
                        name: "对话框表单",
                        model: "form",
                        children: [],
                    },
                ],
            };
        },
    },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
</style>
