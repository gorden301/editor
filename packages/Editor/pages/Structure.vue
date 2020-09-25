<!-- 我的页面 -->
<template>
    <a-layout-content>
        <div class="structure">
            <div class="left">
                <div :class="['mainPage', { 'white': mainActive == true }]" @click="clickMain">
                    <div>
                        <a-button size="small" type="primary" ghost>主页</a-button>
                    </div>
                    <div style="text-align:center;margin-top:20px;font-size:16px;">MainPage</div>
                    <div style="display:flex;justify-content:space-around;margin-top:30px;">
                        <a-button size="small" type="primary" ghost>编辑</a-button>
                        <a-button size="small">设置</a-button>
                        <a-button size="small">预览</a-button>
                    </div>
                </div>
                <template v-show="structures.length > 0">
                    <div
                        :class="['event', { 'white': index == actIndex }]"
                        v-for="(item, index) in structures"
                        :key="index"
                        @click="chooseStructure(item, index)"
                    >
                        <div class="top">
                            <a-button size="small" type="primary" ghost>{{ item.type }}</a-button>
                            <a-icon
                                @click="deleteStructure(item, index)"
                                type="close-circle"
                                style="font-size: 22px;"
                            />
                        </div>
                        <div class="formName">{{ item.name }}</div>
                        <div class="formBtn">
                            <a-button size="small" type="primary" ghost>编辑</a-button>
                            <a-button size="small">设置</a-button>
                            <a-button size="small">预览</a-button>
                        </div>
                    </div>
                </template>
                <div class="add">
                    <a-icon @click="addStructure" type="plus-circle" style="font-size: 22px;" />
                </div>
            </div>
            <div class="right">
                <a-tree
                    :tree-data="treeData"
                    :replace-fields="replaceFields"
                    :autoExpandParent="true"
                ></a-tree>
            </div>
        </div>
        <a-modal v-model="diaVisible" title="新建组件" @ok="handleOk" width="70%">
            <a-form-model v-model="formObj" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="分组名称">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="分组描述">
                    <a-input v-model="form.description" />
                </a-form-model-item>
                <a-form-model-item label="绑定数据key">
                    <a-input v-model="form.model" />
                </a-form-model-item>
                <a-form-model-item label="分组类型">
                    <div>
                        <a-radio-group v-model="form.type" button-style="solid">
                            <a-radio-button value="对话框">对话框</a-radio-button>
                            <a-radio-button value="窗口">窗口</a-radio-button>
                            <a-radio-button value="通知提醒框">通知提醒框</a-radio-button>
                        </a-radio-group>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <div style="width: 60px;">标题</div>
                        <a-input v-model="form.title" />
                    </div>
                    <div style="display:flex;">
                        <div style="width: 60px;">值</div>
                        <a-select v-model="jsType" style="width: 120px">
                            <a-select-option value="String">String</a-select-option>
                            <a-select-option value="Number">Number</a-select-option>
                            <a-select-option value="Boolean">Boolean</a-select-option>
                        </a-select>
                        <a-input v-if="jsType == 'String'" v-model="form.finalValue" />
                        <a-input-number
                            v-if="jsType == 'Number'"
                            :step="1"
                            v-model="form.finalValue"
                        />
                        <a-radio-group v-if="jsType == 'Boolean'" v-model="form.finalValue">
                            <a-radio :value="true">true</a-radio>
                            <a-radio :value="false">false</a-radio>
                        </a-radio-group>
                    </div>
                    <div style="display:flex;align-items:center;">
                        <span style="width: 60px;">显示遮罩</span>
                        <a-radio-group v-model="form.mask">
                            <a-radio :value="true">是</a-radio>
                            <a-radio :value="false">否</a-radio>
                        </a-radio-group>
                    </div>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </a-layout-content>
</template>

<script>
export default {
    // import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        // 这里存放数据
        return {
            actIndex: -1,
            replaceFields: {
                title: "name",
                key: "model",
            },
            finalValue: "",
            jsType: "String",
            mainActive: true,
            structures: [],
            diaVisible: false,
            labelCol: { span: 2 },
            wrapperCol: { span: 6 },
            form: {
                name: "",
                description: "",
                model: "",
                value: "",
                type: "对话框",
                finalValue: "",
                title: "",
                mask: true,
                widgetForm: {
                    config: {
                        events: [],
                    },
                    list: [],
                },
            },
        };
    },
    props: {
        treeData: {
            type: Array,
        },
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
        deleteStructure(item, index) {
            this.structures.splice(index, 1);
            this.$emit("deleteCus", {
                item,
                index,
            });
        },
        clickMain() {
            this.mainActive = true;
            this.actIndex = -1;
            this.$emit('chooseTreeData', {
                type: 'mainPage'
            })
        },
        handleOk() {
            this.diaVisible = false;
            this.structures.push(this.formObj);
            this.$emit("addCus", this.formObj);
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
                widgetForm: {
                    config: {
                        events: [],
                    },
                    list: [],
                },
                treeData: [
                    {
                        name: "对话框表单",
                        model: "form",
                        children: [],
                    },
                ],
            };
        },
        chooseStructure(item, index) {
            this.mainActive = false;
            this.actIndex = index;
            this.$emit('chooseTreeData', {
                type: 'custom',
                item
            })
        },
    },
};
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.structure {
    .white {
        background-color: #fff;
    }
    display: flex;
    width: 100%;
    height: 100%;
    .left {
        width: 300px;
        height: 100%;
        background-color: #f7f7f7;
        .event {
            padding: 10px;
            height: 150px;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #d8d8d8;
            .top {
                display: flex;
                justify-content: space-between;
            }
            .formBtn {
                display: flex;
                justify-content: space-around;
                margin-top: 30px;
            }
            .formDescription {
                color: #000;
                font-size: 16px;
            }
            .formName {
                text-align: center;
                margin-top: 20px;
                font-size: 16px;
            }
        }
        .mainPage {
            padding: 10px;
            height: 150px;
            display: flex;
            flex-direction: column;
            border-bottom: 1px solid #d8d8d8;
        }
        .add {
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #d8d8d8;
        }
    }
}
</style>
