<template>
    <a-form-item :label="widget.name" :prop="widget.model">
        <!-- <template v-if="widget.type === 'form'"> 

        </template> -->
        <template v-if="widget.type == 'custom'">
            <div :id="widget.key + 'pre'"></div>
        </template>
        <template v-if="widget.type === 'input'">
            <!-- <a-input
                v-if="widget.props.dataType === 'number' || widget.props.dataType === 'integer' || widget.props.dataType === 'float'"
                v-model.number="widget.props.defaultValue"
                :type="widget.props.dataType"
                :placeholder="widget.props.placeholder"
                :style="styleString"
                :readonly="readonly || widget.props.readonly"
            />-->
            <a-input
                v-model="widget.props.defaultValue"
                @click="
                    widget.eventsConfig['click'].length > 0
                        ? handleEvents('click')
                        : doNothing
                "
                @blur="
                    widget.eventsConfig['blur'].length > 0
                        ? handleEvents('blur')
                        : doNothing
                "
                :type="widget.props.dataType"
                :placeholder="widget.props.placeholder"
                :style="styleString"
                :readonly="readonly || widget.props.readonly"
            />
        </template>

        <template v-if="widget.type === 'textarea'">
            <a-input
                v-model="widget.props.defaultValue"
                type="textarea"
                :rows="5"
                :disabled="widget.props.disabled"
                :placeholder="widget.props.placeholder"
                :style="styleString"
                :readonly="readonly || widget.props.readonly"
            />
        </template>

        <!-- <template v-if="widget.type === 'richtext'">
            <tiny-mce
                v-model="dataModel"
                :bbcode="widget.options.bbcode"
                :basic="widget.options.mceStyle === 'basic'"
                :mini="widget.options.mceStyle === 'mini'"
                :inline="widget.options.mceStyle === 'inline'"
                :statusbar="widget.options.statusbar"
                :media="widget.options.media"
                :forced-root-block="widget.options.forcedRootBlock"
                :width="widget.options.width"
                :height="widget.options.height"
                :readonly="readonly || widget.options.readonly"
            />
        </template>

        <template v-else-if="widget.type === 'number'">
            <a-input-number
                v-model="dataModel"
                :style="{width: widget.options.width, 'pointer-events': readonly || widget.options.readonly ? 'none' : 'inherit'}"
                :step="widget.options.step"
                :disabled="widget.options.disabled"
                controls-position="right"
            />
        </template>-->

        <template v-else-if="widget.type === 'radio'">
            <a-radio-group
                v-model="widget.props.defaultValue"
                :style="styleString"
            >
                <a-radio
                    v-for="(item, index) in widget.props.remote
                        ? widget.props.remoteOptions
                        : widget.props.options"
                    :key="index"
                    :style="styleString"
                    :value="item.value"
                >
                    <template v-if="widget.props.remote">{{
                        item.label
                    }}</template>
                    <template v-else>{{
                        widget.props.showLabel ? item.label : item.value
                    }}</template>
                </a-radio>
            </a-radio-group>
        </template>

        <template v-else-if="widget.type === 'checkbox'">
            <a-checkbox-group
                v-model="widget.props.defaultValue"
                :style="styleString"
            >
                <a-checkbox
                    v-for="(item, index) in widget.props.remote
                        ? widget.props.remoteOptions
                        : widget.props.options"
                    :key="index"
                    :style="styleString"
                    :value="item.value"
                >
                    <template v-if="widget.props.remote">{{
                        item.label
                    }}</template>
                    <template v-else>{{
                        widget.props.showLabel ? item.label : item.value
                    }}</template>
                </a-checkbox>
            </a-checkbox-group>
        </template>

        <template v-else-if="widget.type === 'time'">
            <a-time-picker
                v-model="widget.props.defaultValue"
                :is-range="widget.props.isRange"
                :placeholder="widget.props.placeholder"
                :start-placeholder="widget.props.startPlaceholder"
                :end-placeholder="widget.props.endPlaceholder"
                :readonly="readonly || widget.props.readonly"
                :disabled="widget.props.disabled"
                :editable="widget.props.editable"
                :clearable="widget.props.clearable"
                :arrow-control="widget.props.arrowControl"
                :value-format="widget.props.format"
                :style="{ width: widget.props.width }"
            />
        </template>

        <template v-else-if="widget.type === 'date'">
            <a-date-picker
                v-model="widget.props.defaultValue"
                :type="widget.props.type"
                :placeholder="widget.props.placeholder"
                :start-placeholder="widget.props.startPlaceholder"
                :end-placeholder="widget.props.endPlaceholder"
                :readonly="readonly || widget.props.readonly"
                :disabled="widget.props.disabled"
                :editable="widget.props.editable"
                :clearable="widget.props.clearable"
                :value-format="
                    widget.props.timestamp ? 'timestamp' : widget.props.format
                "
                :format="widget.props.format"
                :style="styleString"
            />
        </template>

        <template v-else-if="widget.type === 'rate'">
            <a-rate
                v-model="widget.props.defaultValue"
                :count="widget.props.count"
                :disabled="
                    widget.props.disabled || readonly || widget.props.readonly
                "
                :allow-half="widget.props.allowHalf"
            />
        </template>

        <template v-else-if="widget.type === 'color'">
            <a-color-picker
                v-model="widget.props.defaultValu"
                :disabled="widget.props.disabled"
                :style="{
                    'pointer-events':
                        readonly || widget.props.readonly ? 'none' : 'inherit',
                }"
                :show-alpha="widget.props.showAlpha"
            />
        </template>

        <template v-else-if="widget.type === 'select'">
            <a-select
                v-model="widget.props.defaultValue"
                :disabled="widget.props.disabled"
                :multiple="widget.props.multiple"
                :clearable="widget.props.clearable"
                :placeholder="widget.props.placeholder"
                :style="count"
                :filterable="widget.props.filterable"
            >
                <a-select-option
                    v-for="item in widget.props.remote
                        ? widget.options.remoteOptions
                        : widget.props.options"
                    :key="item.value"
                    :value="item.value"
                    :label="
                        widget.props.showLabel || widget.props.remote
                            ? item.label
                            : item.value
                    "
                >
                    {{ item.label }}
                </a-select-option>
            </a-select>
        </template>

        <template v-else-if="widget.type === 'switch'">
            <a-switch
                v-model="widget.props.defaultValue"
                :style="count"
                :disabled="widget.props.disabled"
            />
        </template>

        <template v-else-if="widget.type === 'slider'">
            <a-slider
                v-model="widget.props.defaultValue"
                :min="widget.props.min"
                :max="widget.props.max"
                :style="{
                    'pointer-events':
                        readonly || widget.props.readonly ? 'none' : 'inherit',
                }"
                :disabled="widget.props.disabled"
                :step="widget.props.step"
                :show-input="widget.props.showInput"
                :range="widget.props.range"
            />
        </template>

        <template v-else-if="widget.type === 'upload'">
            <select-media
                v-model="widget.props.defaultValue"
                :style="{
                    'pointer-events':
                        readonly || widget.props.readonly ? 'none' : 'inherit',
                }"
                :disabled="widget.props.disabled"
            />
        </template>

        <template v-else-if="widget.type === 'editor'">
            <!--
      <fm-editor
        v-model="dataModel"
        :width="widget.options.width"
        :height="widget.options.height"
      >
      </fm-editor>
            -->
            <div />
        </template>

        <template v-else-if="widget.type === 'cascader'">
            <a-cascader
                v-model="dataModel"
                :disabled="widget.props.disabled"
                :clearable="widget.props.clearable"
                :placeholder="widget.props.placeholder"
                :style="{
                    width: widget.props.width,
                    'pointer-events':
                        readonly || widget.props.readonly ? 'none' : 'inherit',
                }"
                :options="widget.props.remoteOptions"
            />
        </template>

        <!-- <template v-else-if="widget.type === 'selectServer'">
            <select-server
                v-model="dataModel"
                :multiple="widget.options.multiple"
                :all-servers="widget.options.allServers"
                :style="{'pointer-events': readonly || widget.options.readonly ? 'none' : 'inherit'}"
            />
        </template>

        <template v-else-if="widget.type === 'selectAndAdd'">
            <select-and-add
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :readonly="readonly || widget.options.readonly"
                :clearable="widget.options.clearable"
                :placeholder="widget.options.placeholder"
                :style="{width: widget.options.width}"
                :props="widget.options.props"
                :store="widget.options.store"
                :store-type="widget.options.storeType"
                :options="widget.options.remote ? widget.options.remoteOptions : widget.options.options"
            />
        </template>

        <template v-else-if="widget.type === 'selectItem'">
            <select-item
                v-model="dataModel"
                :style="{width: widget.options.width}"
                :store-type="widget.options.storeType"
            />
        </template>

        <template v-else-if="widget.type === 'inputPlayer'">
            <input-player
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :readonly="readonly || widget.options.readonly"
            />
        </template>

        <template v-else-if="widget.type === 'i18n'">
            <i18n-input
                v-model="dataModel"
                :disabled="widget.options.disabled"
                :readonly="readonly || widget.options.readonly"
                :lite="!!widget.options.liteMode"
                :value-type="widget.options.valueType"
            />
        </template>

        <template v-else-if="widget.type === 'dynamicComponent'">
            <dynamicComponent v-model="dataModel" :component="widget.options.componentPath" />
        </template>

        <template v-if="widget.componentPath">
            <dynamicComponent
                v-model="dataModel"
                v-bind="widget.options"
                :component="widget.componentPath"
                v-on="$listeners"
            />
        </template>-->
    </a-form-item>
</template>

<script>
function load(mod) {
    return () => ({
        delay: 0,
        timeout: 5000,
        component: new Promise(function (resolve, reject) {
            require([mod], function (obj) {
                resolve.call(this, obj);
            }, reject);
        }),
    });
}

export default {
    // props: ['widget', 'models', 'rules', 'remote', 'readonly'],
    components: {
        selectServer: load("../selectServer.vue"),
        selectAndAdd: load("../selectAndAdd.vue"),
        inputPlayer: load("../inputPlayer.vue"),
        i18nInput: load("../form/i18nInput.vue"),
        TinyMce: load("../TinyMce.vue"),
        selectMedia: load("../form/selectMedia.vue"),
        selectItem: load("../selectItem.vue"),
        dynamicComponent: load("../dynamicComponent.vue"),
    },
    computed: {
        eventMaps() {
            return {
                // 'click': this.widget.eventsConfig['click'].length > 0 ? this.handleEvents('click') : this.doNothing,
                // 'hover': this.widget.eventsConfig['hover'].length > 0 ? this.handleEvents('hover') : this.doNothing,
                blur:
                    this.widget.eventsConfig["blur"].length > 0
                        ? this.handleEvents("blur")
                        : this.doNothing,
            };
        },
        styleString() {
            return Object.keys(this.widget.style)
                .map((item, index) => {
                    return `${item}:${Object.values(this.widget.style)[index]}`;
                })
                .join(";");
        },
        conditonRule() {
            if (
                !this.widget.props.conditionConfig.allowCondition ||
                this.widget.props.conditionConfig.conditions.length == 0
            ) {
                return true;
            } else {
                let arr = this.widget.props.conditionConfig.conditions.map(
                    (item) => {
                        let obj = this.data.list.filter((k) => {
                            return k.model == item.modelName;
                        })[0];
                        if (!obj) {
                            return true;
                        }
                        return `'${obj.props.defaultValue}'${item.type}'${item.value}'`;
                    }
                );
                if (this.widget.props.conditionConfig.type == "and") {
                    return this.evil(arr.join("&&"));
                } else {
                    return this.evil(arr.join("||"));
                }
            }
        },
    },
    props: {
        count: Number,
        visible: Boolean,
        widget: {
            type: Object,
            default: Object,
        },
        models: {
            type: Object,
            default: Object,
        },
        remote: {
            type: Object,
            default: Object,
        },
        form: {
            type: Object,
            default: {},
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: {},
        },
        testVisible: {
            type: Boolean,
        },
    },
    data() {
        return {
            dataModel: this.models[this.widget.model],
        };
    },
    watch: {
        dataModel: {
            deep: true,
            handler(val) {
                let model = this.widget.model || this.widget.key;
                this.models[model] = val;
                this.$emit("update:models", {
                    ...this.models,
                    [model]: val,
                });
            },
        },
        testVisible: {
            immediate: true,
            handler(val) {
                if (val) {
                    if (this.widget) {
                        this.$nextTick(() => {
                            if (this.widget.type == "custom") {
                                this.widget.pluginInstancePre = window.formProps.create(
                                    this.widget.pluginName,
                                    this.widget.key + "pre",
                                    `#${this.widget.key}pre`,
                                    `#${this.widget.key}pre`
                                );
                            }
                        });
                    }
                } else {
                    this.$nextTick(() => {
                        this.widget.pluginInstancePre.destroy();
                    });
                }
            },
        },
        models: {
            deep: true,
            handler(val) {
                let model = this.widget.model || this.widget.key;
                this.dataModel = val[model];
            },
        },
    },
    mounted() {
        this.bus.$on("destroyCustom", () => {
            this.widget.pluginInstancePre.destroy();
        })
        // this.$nextTick(() => {
        //     if (this.widget.type == "custom") {
        //         window.formProps.create(
        //             this.widget.pluginName,
        //             this.widget.key + "pre",
        //             `#${this.widget.key}pre`,
        //             `#${this.widget.key}pre`
        //         );
        //     }
        // });
    },
    created() {
        if (
            this.widget.options.remote &&
            this.remote[this.widget.options.remoteFunc]
        ) {
            let args = this.widget.options.remoteFuncArgs || "";
            args = args.split(",");
            this.remote[this.widget.options.remoteFunc]((data) => {
                this.widget.options.remoteOptions = data.map((item) => {
                    return {
                        value: item[this.widget.options.props.value],
                        label: item[this.widget.options.props.label],
                        children: item[this.widget.options.props.children],
                    };
                });
            }, ...args);
        }

        if (this.widget.type === "imgupload") {
            this.remote[this.widget.options.tokenFunc]((data) => {
                this.widget.options.token = data;
            });
        }
    },
    methods: {
        createComponent() {
            this.$nextTick(() => {
                if (this.widget.type == "custom") {
                    window.formProps.create(
                        this.widget.pluginName,
                        this.widget.key + "pre",
                        `#${this.widget.key}pre`,
                        `#${this.widget.key}pre`
                    );
                }
            });
        },
        doNothing() {},
        handleEvents(type) {
            let eventDetail = this.form.config.events.filter((item) => {
                return (
                    this.widget.eventsConfig[type][0].event == item.eventName
                );
            });
            this.$set(
                this.data.list[
                    this.data.list.findIndex((item) => {
                        return item.model == eventDetail[0].model;
                    })
                ].props,
                "defaultValue",
                eventDetail[0].finalValue
            );
        },
        evil(str) {
            let fn = Function;
            return new fn("return" + str)();
        },
    },
};
</script>
