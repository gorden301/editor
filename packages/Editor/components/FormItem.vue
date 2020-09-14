<template>
    <a-form-model-item
        v-if="element && element.key"
        class="widget-view"
        style="z-index:99;"
        :class="{active: select.key === element.key, 'is_req': element.options.required}"
        :label="element.name"
    >
        <template v-if="element.type === 'input'">
            <a-input
                v-model="element.props.defaultValue"
                :style="styleString"
                :placeholder="element.props.placeholder"
            />
        </template>

        <template v-if="element.type === 'textarea'">
            <a-input
                v-model="element.props.defaultValue"
                type="textarea"
                :rows="5"
                :style="styleString"
                :disabled="element.options.disabled"
                :placeholder="element.props.placeholder"
            />
        </template>

        <template v-if="element.type === 'number'">
            <a-input-number
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :controls-position="element.options.controlsPosition"
                :style="{width: element.options.width}"
            />
        </template>

        <template v-if="element.type === 'radio'">
            <a-radio-group v-model="element.props.defaultValue" :style="styleString">
                <a-radio
                    v-for="(item, _index) in element.props.options"
                    :key="item.value + _index"
                    :style="styleString"
                    :label="item.value"
                >{{ element.props.showLabel ? item.label : item.value }}</a-radio>
            </a-radio-group>
        </template>

        <template v-if="element.type === 'checkbox'">
            <a-checkbox-group
                v-model="element.props.defaultValue"
                :style="{width: element.style.width}"
            >
                <a-checkbox
                    v-for="(item, _index) in element.props.options"
                    :key="item.value + _index"
                    :style="{display: element.style.display }"
                    :label="item.value"
                >{{ element.props.showLabel ? item.label : item.value }}</a-checkbox>
            </a-checkbox-group>
        </template>

        <template v-if="element.type === 'time'">
            <a-time-picker
                v-model="element.props.defaultValue"
                :is-range="element.props.isRange"
                :allowClear="element.props.allowClear"
                :placeholder="element.props.placeholder"
                :start-placeholder="element.props.startPlaceholder"
                :end-placeholder="element.props.endPlaceholder"
                :readonly="element.props.readonly"
                :disabled="element.props.disabled"
                :editable="element.props.editable"
                :clearable="element.props.clearable"
                :arrow-control="element.props.arrowControl"
                :style="styleString"
            />
        </template>

        <template v-if="element.type === 'date'">
            <a-date-picker
                v-model="element.options.defaultValue"
                :type="element.options.type"
                :is-range="element.options.isRange"
                :placeholder="element.options.placeholder"
                :start-placeholder="element.options.startPlaceholder"
                :end-placeholder="element.options.endPlaceholder"
                :readonly="element.options.readonly"
                :disabled="element.options.disabled"
                :editable="element.options.editable"
                :clearable="element.options.clearable"
                :style="{width: element.options.width}"
            />
        </template>

        <template v-if="element.type === 'rate'">
            <a-rate
                v-model="element.props.defaultValue"
                :count="element.props.count"
                :disabled="element.props.disabled"
                :allow-half="element.props.allowHalf"
            />
        </template>

        <template v-if="element.type === 'color'">
            <a-color-picker
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :show-alpha="element.options.showAlpha"
            />
        </template>

        <template v-if="element.type === 'select'">
            <a-select
                v-model="element.props.defaultValue"
                :disabled="element.props.disabled"
                :placeholder="element.props.placeholder"
                :style="element.props.style"
            >
                <a-select-option
                    v-for="item in element.props.options"
                    :key="item.value"
                    :value="item.value"
                    :label="element.props.showLabel?item.label:item.value"
                ></a-select-option>
            </a-select>
        </template>

        <template v-if="element.type === 'switch'">
            <a-switch v-model="element.props.defaultValue" :disabled="element.props.disabled" />
        </template>

        <template v-if="element.type === 'slider'">
            <a-slider
                v-model="element.props.defaultValue"
                :min="element.props.min"
                :max="element.props.max"
                :disabled="element.props.disabled"
                :step="element.props.step"
                :show-input="element.props.showInput"
                :range="element.props.range"
                :style="{width: element.props.width}"
            />
        </template>

        <template v-if="element.type === 'cascader'">
            <a-cascader
                v-model="element.options.defaultValue"
                :disabled="element.options.disabled"
                :clearable="element.options.clearable"
                :placeholder="element.options.placeholder"
                :style="{width: element.options.width}"
                :options="element.options.remoteOptions"
            />
        </template>

        <template v-if="element.type === 'blank'">
            <div
                style="background: #ccc;
  color: #999;
  height: 50px;
  line-height: 50px;
  text-align: center;"
            >自定义区域</div>
        </template>

        <template v-if="element.type === 'tab'">
            <div
                style="background: #ccc;
  color: #999;
  height: 50px;
  line-height: 50px;
  text-align: center;"
            >Tab区域</div>
        </template>

        <template v-if="element.type === 'external'">
            <component :is="element.component" />
        </template>

        <!-- <template v-if="element.componentPath">
      <dynamicComponent
        v-model="element.options.defaultValue"
        :component="element.componentPath"
      />
        </template>-->

        <a-button
            v-if="select.key === element.key"
            slot="extra"
            title="删除"
            icon="delete"
            class="widget-action-delete"
            shape="circle"
            type="danger"
            @click.stop="handleWidgetDelete(index)"
        />
        <a-button
            v-if="select.key === element.key"
            slot="extra"
            title="复制"
            icon="copy"
            class="widget-action-clone"
            shape="circle"
            type="success"
            @click.stop="handleWidgetClone(index)"
        />
    </a-form-model-item>
</template>

<script>
export default {
    components: {},
    props: {
        element: {
            type: Object,
            default: Object,
        },
        select: {
            type: Object,
            default: Object,
        },
        index: {
            type: Number,
            default: Number,
        },
        data: {
            type: Object,
            default: Object,
        },
    },
    data() {
        return {
            // elementCopy: JSON.parse(JSON.stringify(this.element)),
        };
    },
    watch: {},
    computed: {
        // elementCopy() {
        //     return JSON.parse(JSON.stringify(this.element))
        // },
        conditonRule() {
            if(!this.element.props.conditionConfig.allowCondition || this.element.props.conditionConfig.conditions.length == 0) {
                return true
            } else {
                let arr = this.element.props.conditionConfig.conditions.map(item => {
                    let obj = this.data.list.filter(k => {
                        return k.model == item.modelName
                    })[0]
                    if(!obj) {
                        return true
                    }
                    return `${obj.props.defaultValue}${item.type}${item.value}`
                })
                if(this.element.props.conditionConfig.type == 'and') {
                    return this.evil(arr.join('&&'))
                } else {
                    return this.evil(arr.join('||'))
                }
            }
        },
        styleString() {
            let styleObj = this.element.style;
            return Object.keys(styleObj)
                .map((ele, index) => {
                    return `${ele}:${Object.values(styleObj)[index]};`;
                })
                .join("");
        },
    },
    mounted() {},
    methods: {
        evil(str) {
            let fn = Function
            return new fn('return' + str)()
        },
        handleWidgetDelete(index) {
            if (this.data.list.length - 1 === index) {
                if (index === 0) {
                    this.$emit("item-select-event", {});
                } else {
                    this.$emit("item-select-event", this.data.list[index - 1]);
                }
            } else {
                this.$emit("item-select-event", this.data.list[index + 1]);
            }

            this.$nextTick(() => {
                this.data.list.splice(index, 1);
            });
        },
        handleWidgetClone(index) {
            let cloneData = this.$merge(
                { ...this.data.list[index] },
                {
                    key:
                        ".key." +
                        this.data.list[index].type +
                        "." +
                        Date.parse(new Date()) +
                        "." +
                        Math.ceil(Math.random() * 99999),
                }
            );

            if (
                this.data.list[index].type === "radio" ||
                this.data.list[index].type === "checkbox"
            ) {
                cloneData = {
                    ...cloneData,
                    options: {
                        ...cloneData.options,
                        options: cloneData.options.options.map((item) => ({
                            ...item,
                        })),
                    },
                };
            }

            this.data.list.splice(index, 0, cloneData);

            this.$nextTick(() => {
                this.$emit("item-select-event", this.data.list[index + 1]);
            });
        },
    },
};
</script>
