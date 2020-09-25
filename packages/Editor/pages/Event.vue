<!-- 我的页面 -->
<template>
    <a-layout style="height:100%;">
        <div class="events">
            <div class="left">
                <template v-show="events.length > 0">
                    <div
                        :class="['event', { 'white': index == actIndex }]"
                        v-for="(item, index) in events"
                        :key="index"
                        @click="chooseEvent(item, index)"
                    >
                        <div>
                            <div class="formDescription">{{ item.description }}</div>
                            <div class="formName">{{ item.name }}</div>
                        </div>
                        <a-icon
                            @click="deleteEvent(index)"
                            type="close-circle"
                            style="font-size: 22px;"
                        />
                    </div>
                </template>
                <div class="add" @click="addEvent">
                    <a-icon type="plus-circle" style="font-size: 22px;" />
                </div>
            </div>
            <div class="right">
                <a-form-model
                    v-show="showForm"
                    v-model="formObj"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-model-item label="事件名称">
                        <a-input v-model="form.name" />
                    </a-form-model-item>
                    <a-form-model-item label="事件描述">
                        <a-input v-model="form.description" />
                    </a-form-model-item>
                    <a-form-model-item label="绑定数据key">
                        <a-input v-model="form.model" />
                    </a-form-model-item>
                    <a-form-model-item label="数据处理">
                        <a-radio-group v-model="form.value" @change="onChange">
                            <a-radio-button value="a">修改值</a-radio-button>
                            <a-radio-button value="b">切换值</a-radio-button>
                        </a-radio-group>
                        <div>
                            <a-radio-group v-model="form.type" @change="onChange">
                                <a-radio value="fixed">固定值</a-radio>
                                <a-radio value="model">绑定数据</a-radio>
                            </a-radio-group>
                        </div>
                        <div style="display:flex;">
                            <a-select
                                v-model="jsType"
                                style="width: 120px"
                            >
                                <a-select-option value="String">String</a-select-option>
                                <a-select-option value="Number">Number</a-select-option>
                                <a-select-option value="Boolean">Boolean</a-select-option>
                            </a-select>
                            <a-input v-if="jsType == 'String'" v-model="form.finalValue" />
                            <a-input-number v-if="jsType == 'Number'" :step="1" v-model="form.finalValue" />
                             <a-radio-group v-if="jsType == 'Boolean'" v-model="form.finalValue">
                                <a-radio :value="true">true</a-radio>
                                <a-radio :value="false">false</a-radio>
                            </a-radio-group>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
                        <a-button type="primary" @click="onSubmit">确定</a-button>
                        <a-button style="margin-left: 10px;">取消</a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
    </a-layout>
</template>

<script>
export default {
    // import引入的组件需要注入到对象中才能使用
    name: "Event",
    components: {},
    props: {
        data: {
            type: Object,
            default: {
                list: [],
            },
        },
    },
    data() {
        // 这里存放数据
        return {
            finalValue: '',
            jsType: 'String',
            type: "fixed",
            value: "a",
            actIndex: -1,
            showForm: false,
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
            events: [],
            activeKey: 1,
            newTabIndex: 0,
            form: {
                name: "",
                description: "",
                model: "",
                value: '',
                type: '',
                finalValue: ''
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
        conditionOptions() {
            if (this.data.list.length == 0) {
                return [];
            } else {
                return this.data.list.map((item) => {
                    return {
                        value: item.model,
                        label: item.model,
                    };
                });
            }
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
        onChange() {},
        deleteEvent(index) {
            this.events.splice(index, 1);
            this.$emit('deleteEvents', index)
        },
        chooseEvent(item, index) {
            this.actIndex = index;
            this.formObj = item;
            this.showForm = true;
        },
        onEdit() {},
        addEvent() {
            this.actIndex = -1;
            this.formObj = {
                name: "",
                description: "",
                model: "",
            };
            this.showForm = true;
        },
        onSubmit() {
            this.$emit('addEvents', {
                eventName: this.form.name,
                eventDescription: this.form.description,
                model: this.form.model,
                value: this.form.value,
                type: this.form.type,
                finalValue: this.form.finalValue
            })
            this.events.push(this.form);
            this.showForm = false;
        },
    },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.events {
    .white {
        background-color: #fff;
    }
    display: flex;
    width: 100%;
    height: 100%;
    .right {
        flex: 1;
        background-color: #fff;
        padding-top: 40px;
        cursor: pointer;
    }
    .left {
        width: 300px;
        height: 100%;
        cursor: pointer;
        background-color: #f7f7f7;
        .event {
            height: 100px;
            display: flex;
            padding-left: 20px;
            padding-right: 20px;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #d8d8d8;
            .formDescription {
                color: #000;
                font-size: 16px;
            }
            .formName {
                color: #d8d8d8;
                font-size: 14px;
            }
        }
        .add {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #d8d8d8;
        }
    }
}
</style>
