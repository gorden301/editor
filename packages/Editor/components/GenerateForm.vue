<template>
    <div>
        <a-form
            ref="generateForm"
            :model="models"
            :rules="rules"
            v-bind="$attrs"
        >
            <slot name="header" />
            <template v-for="item in data.list">
                <template v-if="item.type === 'grid'">
                    <a-row
                        :key="item.key"
                        type="flex"
                        :gutter="item.options.gutter ? item.options.gutter : 0"
                        :justify="item.options.justify"
                        :align="item.options.align"
                    >
                        <a-col
                            v-for="(col, colIndex) in item.columns"
                            :key="colIndex"
                            :span="col.span"
                        >
                            <template v-for="citem in col.list">
                                <a-form-item
                                    v-if="citem.type === 'blank'"
                                    :key="citem.key"
                                    :label="citem.name"
                                    :prop="citem.model"
                                >
                                    <slot :name="citem.model" :model="models" />
                                </a-form-item>
                                <template v-else-if="citem.type === 'form'">
                                    <generate-form
                                        :key="citem.type"
                                        :data="citem"
                                        :value="value"
                                    >
                                    </generate-form>
                                </template>
                                <generate-form-item
                                    v-else
                                    :key="citem.key"
                                    :models.sync="models"
                                    :rules="rules"
                                    :widget="citem"
                                    preview="preview"
                                    :readonly="readonly"
                                />
                            </template>
                        </a-col>
                    </a-row>
                </template>

                <template v-else-if="item.type === 'tab'">
                    <a-form-item
                        :key="'tab_' + item.name"
                        :label="item.options.hideLabel ? '' : item.name"
                        :laba-width="item.options.hideLabel ? '0px' : undefined"
                    >
                        <a-tabs
                            v-model="models[item.model || item.key]"
                            :tab-position="item.options.tabPosition"
                            :type="item.options.type"
                            :class="item.options.class"
                        >
                            <a-tab-pane
                                v-for="(col, colIndex) in item.columns"
                                :key="col.name"
                                :name="'' + col.name"
                                :tab="
                                    col.label
                                        ? col.label
                                        : 'Tab' + (colIndex + 1)
                                "
                            >
                                <tab-inline-form
                                    :size="item.options.formSize"
                                    :laba-position="
                                        item.options.formLabelPosition
                                    "
                                    :laba-width="
                                        item.options.formLabelWidth + 'px'
                                    "
                                >
                                    <template v-for="citem in col.list">
                                        <a-form-item
                                            v-if="citem.type === 'blank'"
                                            :key="citem.key"
                                            :label="citem.label"
                                            :prop="citem.model"
                                        >
                                            <slot
                                                :name="citem.model"
                                                :model="models"
                                            />
                                        </a-form-item>
                                        <template
                                            v-else-if="citem.type === 'form'"
                                        >
                                            <generate-form
                                                :key="citem.type"
                                                :data="citem"
                                                :value="value"
                                            >
                                            </generate-form>
                                        </template>
                                        <generate-form-item
                                            v-else
                                            :key="citem.key"
                                            :models.sync="models"
                                            :rules="rules"
                                            :widget="citem"
                                            :preview="preview"
                                            :readonly="readonly"
                                        />
                                    </template>
                                </tab-inline-form>
                            </a-tab-pane>
                        </a-tabs>
                    </a-form-item>
                </template>

                <template v-else-if="item.type === 'blank'">
                    <a-form-item
                        :key="item.key"
                        :label="item.name"
                        :prop="item.model"
                    >
                        <slot :name="item.model" :model="models" />
                    </a-form-item>
                </template>
                <template v-else-if="item.type === 'form'">
                    <generate-form :key="item.type" :data="item" :value="value">
                    </generate-form>
                </template>
                <template v-else-if="item.type === '对话框'">
                    <a-modal
                        :title="item.title"
                        :key="item.type"
                        :visible="visible"
                        :confirm-loading="confirmLoading"
                    >
                        <p>{{ ModalText }}</p>
                    </a-modal>
                </template>
                <template v-else>
                    <generate-form-item
                        :key="item.key"
                        :models.sync="models"
                        :rules="rules"
                        :data="data"
                        :form="form"
                        :testVisible="testVisible"
                        :widget="item"
                        :preview="preview"
                        :readonly="readonly"
                    />
                </template>
            </template>
            <slot />
        </a-form>
    </div>
</template>

<script>
import GenerateFormItem from "./GenerateFormItem.vue";
// import tabInlineForm from "./tabInlineForm.vue";
// import { mergeDefaultOption } from "./componentsConfig";

export default {
    name: "generateForm",
    components: {
        GenerateFormItem,
    },
    props: {
        visible: Boolean,
        data: {
            type: Object,
            default: {},
        },
        form: {
            type: Object,
            default: {},
        },
        // remote: {
        //     type: Object,
        //     default: {},
        // },
        value: {
            type: Object,
            default: {},
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        testVisible: {
            type: Boolean,
            default: false,
        },
        listKey: {
            type: [String, Number],
        },
    },
    // computed: {
    //     conditonRule() {
    //         if (
    //             !this.widget.props.conditionConfig.allowCondition ||
    //             this.widget.props.conditionConfig.conditions.length == 0
    //         ) {
    //             return true;
    //         } else {
    //             let arr = this.widget.props.conditionConfig.conditions.map(
    //                 (item) => {
    //                     let obj = this.data.list.filter((k) => {
    //                         return k.model == item.modelName;
    //                     })[0];
    //                     if (!obj) {
    //                         return true;
    //                     }
    //                     return `'${obj.props.defaultValue}'${item.type}'${item.value}'`;
    //                 }
    //             );
    //             if (this.widget.props.conditionConfig.type == "and") {
    //                 return this.evil(arr.join("&&"));
    //             } else {
    //                 return this.evil(arr.join("||"));
    //             }
    //         }
    //     },
    // },
    data() {
        return {
            models: {},
            rules: {},
            tmpModels: "",
        };
    },
    watch: {
        //  testVisible: {
        //    immediate: true,
        //     handler(val) {
        //         debugger;
        //         if (val) {
        //             this.$nextTick(() => {
        //                 if (this.widget.type == "custom") {
        //                     window.formProps.create(
        //                         this.widget.pluginName,
        //                         this.widget.key + "pre",
        //                         `#${this.widget.key}pre`,
        //                         `#${this.widget.key}pre`
        //                     );
        //                 }
        //             });
        //         }
        //     },
        // },
        data: {
            deep: true,
            handler(val) {
                this.generateModel(val.list);
            },
        },
        value: {
            deep: true,
            handler(val) {
                if (typeof val !== "object") return;
                for (let key in val) {
                    if (this.models[key] !== val[key]) {
                        this.models[key] = val[key];
                    }
                }
            },
        },
        models: {
            deep: true,
            handler(val) {
                this.$emit("input", val);
            },
        },
    },
    created() {
        // if (this.data.config) {
        this.generateModel(this.data.list);
        // }
        // if(this.)
        console.log(JSON.stringify(this.data));
    },
    mounted() {
    },
    methods: {
        preview() {},
        generateModel(genList) {
            for (let i = 0; i < genList.length; i++) {
                // mergeDefaultOption(genList[i]);
                const model = genList[i].model || genList[i].key;
                if (genList[i].type === "grid" || genList[i].type === "tab") {
                    genList[i].columns.forEach((item) => {
                        this.generateModel(item.list);
                    });
                    if (genList[i].type === "tab") {
                        if (
                            this.value &&
                            Object.keys(this.value).indexOf(model) >= 0
                        ) {
                            this.$set(this.models, model, this.value[model]);
                        } else {
                            this.$set(
                                this.models,
                                model,
                                genList[i].defaultValue
                            );
                        }
                    }
                } else if (genList[i].type === "form") {
                    genList[i].list = this.form.list.filter((item) => {
                        return genList[i].keyName == item.keyName;
                    })[0].list;
                } else {
                    if (
                        this.value &&
                        Object.keys(this.value).indexOf(model) >= 0
                    ) {
                        this.models[model] = this.value[model];
                    } else {
                        if (genList[i].type === "blank") {
                            this.models[model] =
                                genList[i].options.defaultType === "String"
                                    ? ""
                                    : genList[i].options.defaultType ===
                                      "Object"
                                    ? {}
                                    : [];
                        } else {
                            this.models[model] =
                                genList[i].options.defaultValue;
                        }
                    }

                    if (this.rules[model]) {
                        this.rules[model] = [
                            ...this.rules[model],
                            ...genList[i].rules.map((item) => {
                                if (item.pattern) {
                                    return {
                                        ...item,
                                        pattern: eval(item.pattern),
                                    };
                                } else {
                                    return { ...item };
                                }
                            }),
                        ];
                    } else {
                        this.rules[model] = [
                            ...genList[i].rules.map((item) => {
                                if (item.pattern) {
                                    return {
                                        ...item,
                                        pattern: eval(item.pattern),
                                    };
                                } else {
                                    return { ...item };
                                }
                            }),
                        ];
                    }
                }
            }
        },
        // getData() {
        //     return new Promise((resolve, reject) => {
        //         this.$refs.generateForm.validate((valid) => {
        //             if (valid) {
        //                 let rs = {};
        //                 for (let k in this.models) {
        //                     if (k.substr(0, 5) !== ".key.") {
        //                         rs[k] = this.models[k];
        //                     }
        //                 }
        //                 resolve(rs);
        //             } else {
        //                 reject(new Error("表单数据校验失败").message);
        //             }
        //         });
        //     });
        // },
        refresh() {},
        resetFields() {
            this.$refs.generateForm.resetFields();
        },
    },
};
</script>
