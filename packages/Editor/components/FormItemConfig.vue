<template>
    <div v-if="Object.keys(item).length > 0">
        <a-form>
            <a-form-item label="是否开启条件渲染">
                <a-switch v-model="item.props.conditionConfig.allowCondition" />
                <div v-show="item.props.conditionConfig.allowCondition">
                    <div>
                        <a-radio-group
                            v-model="item.props.conditionConfig.type"
                            button-style="solid"
                        >
                            <a-radio value="and">与门</a-radio>
                            <a-radio value="or">或门</a-radio>
                        </a-radio-group>
                        <a-button @click="addCondition">添加条件</a-button>
                    </div>
                    <div
                        v-if="item.props.conditionConfig.conditions.length > 0"
                    >
                        <div
                            style="display: flex; align-items: center"
                            v-for="(obj, index) in item.props.conditionConfig
                                .conditions"
                            :key="index"
                        >
                            <a-select v-model="obj.modelName">
                                <a-select-option
                                    v-for="(val, _index) in conditionOptions"
                                    :key="_index"
                                    :value="val.value"
                                    >{{ val.value }}</a-select-option
                                >
                            </a-select>
                            <a-select v-model="obj.type">
                                <a-select-option value="==">=</a-select-option>
                                <a-select-option value=">">></a-select-option>
                                <a-select-option value="<"
                                    >&lt;</a-select-option
                                >
                            </a-select>
                            <a-input v-model="obj.value" />
                            <a-button
                                type="danger"
                                size="small"
                                @click="deleteCondition(index)"
                                >删除</a-button
                            >
                        </div>
                    </div>
                </div>
            </a-form-item>
            <template v-if="item.type !== 'form'">
                <a-form-item label="标题">
                    <a-input v-model="item.name" />
                </a-form-item>
                <a-form-item v-if="item.type !== 'grid'" label="数据绑定Key">
                    <a-input v-model="item.model" />
                </a-form-item>
                <!-- 条件渲染 -->
                <a-form-item label="触发器">
                    <div v-for="(k, index) in triggers" :key="index">
                        <div class="trigger">
                            <div style="display: flex; align-items: center">
                                <a-icon type="info-circle" />
                                <div>{{ k.label }}</div>
                            </div>
                            <a-icon
                                type="plus"
                                style="cursor: pointer"
                                @click="addEvents(k, index)"
                            />
                        </div>
                        <div v-show="item.eventsConfig[k.key].length > 0">
                            <div
                                v-for="(val, _index) in item.eventsConfig[
                                    k.key
                                ]"
                                :key="_index"
                                style="display: flex; align-items: center"
                            >
                                <a-select v-model="val.event">
                                    <a-select-option
                                        v-for="(m, sec_index) in data.config
                                            .events"
                                        :key="sec_index"
                                        :value="m.eventName"
                                        >{{ m.eventName }}</a-select-option
                                    >
                                </a-select>
                                <a-button
                                    type="danger"
                                    size="small"
                                    @click="deleteEvents(k, _index)"
                                    >删除</a-button
                                >
                            </div>
                        </div>
                    </div>
                </a-form-item>
                <!--  这里设置元素的style属性 -->
                <a-form-item
                    v-if="item.style.hasOwnProperty('width')"
                    label="宽度"
                >
                    <a-input v-model="item.style.width" />
                </a-form-item>
                <a-form-item
                    v-if="item.style.hasOwnProperty('height')"
                    label="高度"
                >
                    <a-input v-model="item.style.height" />
                </a-form-item>
                <a-form-item
                    v-if="item.style.hasOwnProperty('display')"
                    label="布局方式"
                >
                    <a-radio-group
                        v-model="item.style.display"
                        button-style="solid"
                    >
                        <a-radio :value="'block'">块级</a-radio>
                        <a-radio :value="'inline'">行内</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item
                    v-if="item.props.hasOwnProperty('showLabel')"
                    label="是否显示标签"
                >
                    <a-switch v-model="item.props.showLabel" />
                </a-form-item>
                <!-- 评分组件 -->
                <a-form-item
                    v-if="item.props.hasOwnProperty('allowHalf')"
                    label="允许半选"
                >
                    <a-switch v-model="item.props.allowHalf" />
                </a-form-item>
                <a-form-item
                    v-if="item.props.hasOwnProperty('count')"
                    label="最大值"
                >
                    <a-input type="number" v-model="item.props.count" />
                </a-form-item>
                <!-- 这里设置元素功能属性 -->
                <a-form-item
                    v-if="item.props.hasOwnProperty('defaultValue')"
                    label="默认值"
                >
                    <a-switch
                        v-if="item.type == 'switch'"
                        v-model="item.props.defaultValue"
                    />
                    <a-input
                        v-if="item.type == 'input'"
                        v-model="item.props.defaultValue"
                    />
                    <a-textarea
                        v-if="item.type == 'textarea'"
                        :rows="4"
                        v-model="item.props.defaultValue"
                    />
                    <a-rate
                        v-if="item.type === 'rate'"
                        v-model="item.props.defaultValue"
                        style="display: inline-block; vertical-align: middle"
                        :count="item.props.count"
                        :allow-half="item.props.allowHalf"
                    />
                    <a-button
                        v-if="item.type == 'rate'"
                        type="link"
                        @click="item.props.defaultValue = 0"
                        style="
                            display: inline-block;
                            vertical-align: middle;
                            margin-left: 10px;
                        "
                        >清空</a-button
                    >
                </a-form-item>
                <a-form-item
                    v-if="item.props.hasOwnProperty('allowClear')"
                    label="展示清除按钮"
                >
                    <a-radio-group
                        v-model="item.props.allowClear"
                        button-style="solid"
                    >
                        <a-radio :value="true">是</a-radio>
                        <a-radio :value="false">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item
                    v-if="item.props.hasOwnProperty('placeholder')"
                    label="占位符"
                >
                    <a-input v-model="item.props.placeholder" />
                </a-form-item>
                <a-form-item></a-form-item>
                <a-form-item
                    v-if="item.props.hasOwnProperty('options')"
                    label="选项"
                >
                    <a-radio-group
                        v-model="item.props.remote"
                        style="margin-bottom: 10px"
                    >
                        <a-radio-button :value="false">静态数据</a-radio-button>
                        <a-radio-button :value="true">远端数据</a-radio-button>
                    </a-radio-group>
                    <template v-if="item.props.remote">
                        <div>
                            <a-input
                                addon-before="远端方法"
                                v-model="item.props.remoteFunc"
                                style
                            >
                            </a-input>
                            <a-input
                                addon-before="远端方法参数"
                                v-model="item.props.remoteFuncArgs"
                                style
                            >
                            </a-input>
                            <a-input
                                addon-before="值"
                                v-model="item.props.props.value"
                                style
                            >
                            </a-input>
                            <a-input
                                addon-before="标签"
                                v-model="item.props.props.label"
                                style
                            >
                            </a-input>
                        </div>
                    </template>
                    <template v-else>
                        <template
                            v-if="
                                item.type === 'radio' ||
                                (item.props.fatherType === 'select' &&
                                    !item.props.multiple)
                            "
                        >
                            <a-radio-group v-model="item.props.defaultValue">
                                <draggable
                                    tag="ul"
                                    :list="item.props.options"
                                    v-bind="{
                                        group: { name: 'options' },
                                        ghostClass: 'ghost',
                                        handle: '.drag-item',
                                    }"
                                    handle=".drag-item"
                                >
                                    <li
                                        v-for="(k, index) in item.props.options"
                                        :key="index"
                                    >
                                        <a-radio
                                            :value="k.value"
                                            style="margin-right: 5px"
                                        >
                                            <a-input
                                                v-model="k.value"
                                                :style="{
                                                    width: item.props.showLabel
                                                        ? '90px'
                                                        : '190px',
                                                }"
                                            />
                                            <a-input
                                                v-if="item.props.showLabel"
                                                v-model="k.label"
                                                style="
                                                    margin-left: 5px;
                                                    width: 95px;
                                                "
                                            />
                                            <!-- <input v-model="item.value"/> -->
                                        </a-radio>
                                        <i
                                            class="drag-item"
                                            style="
                                                font-size: 16px;
                                                margin: 0 5px;
                                                cursor: move;
                                            "
                                        >
                                            <i
                                                class="iconfont icon-icon_bars"
                                            />
                                        </i>
                                        <a-button
                                            type="danger"
                                            size="small"
                                            @click="handleOptionsRemove(index)"
                                        >
                                            删除
                                        </a-button>
                                    </li>
                                </draggable>
                            </a-radio-group>
                        </template>

                        <template
                            v-if="
                                item.type === 'checkbox' ||
                                (item.type === 'select' && item.props.multiple)
                            "
                        >
                            <a-checkbox-group v-model="item.props.defaultValue">
                                <draggable
                                    tag="ul"
                                    :list="item.props.options"
                                    v-bind="{
                                        group: { name: 'options' },
                                        ghostClass: 'ghost',
                                        handle: '.drag-item',
                                    }"
                                    handle=".drag-item"
                                >
                                    <li
                                        v-for="(k, index) in item.props.options"
                                        :key="index"
                                    >
                                        <a-checkbox
                                            :value="k.value"
                                            style="margin-right: 5px"
                                        >
                                            <a-input
                                                v-model="k.value"
                                                :style="{
                                                    width: item.props.showLabel
                                                        ? '90px'
                                                        : '190px',
                                                }"
                                            />
                                            <a-input
                                                v-if="item.props.showLabel"
                                                v-model="k.label"
                                                style="
                                                    margin-left: 5px;
                                                    width: 95px;
                                                "
                                            />
                                        </a-checkbox>
                                        <i
                                            class="drag-item"
                                            style="
                                                font-size: 16px;
                                                margin: 0 5px;
                                                cursor: move;
                                            "
                                        >
                                            <i
                                                class="iconfont icon-icon_bars"
                                            />
                                        </i>
                                        <a-button
                                            type="danger"
                                            size="small"
                                            @click="handleOptionsRemove(index)"
                                        >
                                            删除
                                        </a-button>
                                        <!-- <a-button
                                            shape="circle"
                                            plain
                                            type="danger"
                                            icon="a-icon-minus"
                                            style="
                                                padding: 4px;
                                                margin-left: 5px;
                                            "
                                            @click="handleOptionsRemove(index)"
                                        /> -->
                                    </li>
                                </draggable>
                            </a-checkbox-group>
                        </template>
                        <div style="margin-left: 22px">
                            <a-button type="text" @click="handleAddOption"
                                >添加选项</a-button
                            >
                        </div>
                    </template>
                </a-form-item>
            </template>
            <template v-if="item.type === 'tab'">
                <a-form-item label="隐藏标题">
                    <a-switch v-model="item.props.hideLabel" />
                </a-form-item>
                <!-- 
                <a-form-item label="标签项">
                    <draggable
                        tag="ul"
                        :list="item.columns"
                        v-bind="{
                            group: { name: 'options' },
                            ghostClass: 'ghost',
                            handle: '.drag-item',
                        }"
                        handle=".drag-item"
                    >
                        <li v-for="(citem, index) in data.columns" :key="index">
                            <i
                                class="drag-item fa fa-arrows-v"
                                style="
                                    font-size: 12px;
                                    margin: 2px 10px 0 0;
                                    cursor: move;
                                "
                            />
                            <a-input
                                v-model="citem.name"
                                style="width: 80px"
                                size="mini"
                            />
                            <i18n-input
                                v-model="citem.label"
                                :lite="true"
                                value-type="object"
                                placeholder="标签名"
                                style="
                                    margin-left: 5px;
                                    width: 150px;
                                    display: inline-block;
                                "
                            />
                            <a-button
                                circle
                                plain
                                type="danger"
                                size="mini"
                                icon="a-icon-minus"
                                style="padding: 4px; margin-left: 5px"
                                @click="handleOptionsRemove(index)"
                            />
                        </li>
                    </draggable>
                    <div style="margin-left: 22px">
                        <a-button type="text" @click="handleAddTabColumn">
                            添加标签
                        </a-button>
                    </div>
                </a-form-item> -->

                <a-form-item label="显示样式">
                    <a-radio-group v-model="item.props.type" size="mini">
                        <a-radio-button label=""> 默认 </a-radio-button>
                        <a-radio-button label="card">
                            选项卡样式
                        </a-radio-button>
                        <a-radio-button label="border-card">
                            卡片样式
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="显示风格 (默认样式下有效)">
                    <a-radio-group v-model="item.props.class" size="mini">
                        <a-radio-button label=""> 默认 </a-radio-button>
                        <a-radio-button label="tabs-material">
                            Material
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="标签位置">
                    <a-radio-group v-model="item.props.tabPosition" size="mini">
                        <a-radio-button label="top"> top </a-radio-button>
                        <a-radio-button label="right"> right </a-radio-button>
                        <a-radio-button label="bottom"> bottom </a-radio-button>
                        <a-radio-button label="left"> left </a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="表单标签对齐方式">
                    <a-radio-group v-model="item.props.formLabelPosition">
                        <a-radio-button label="left"> 左对齐 </a-radio-button>
                        <a-radio-button label="right"> 右对齐 </a-radio-button>
                        <a-radio-button label="top"> 顶部对齐 </a-radio-button>
                    </a-radio-group>
                </a-form-item>

                <a-form-item label="表单字段宽度">
                    <a-input-number
                        v-model="item.props.formLabelWidth"
                        :min="0"
                        :max="400"
                        :step="10"
                    />
                </a-form-item>

                <a-form-item label="表单组件尺寸">
                    <a-radio-group v-model="item.props.formSize">
                        <a-radio-button label=""> default </a-radio-button>
                        <a-radio-button label="medium"> medium </a-radio-button>
                        <a-radio-button label="small"> small </a-radio-button>
                        <a-radio-button label="mini"> mini </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </template>
            <template v-if="item.type !== 'grid' && item.type !== 'tab'">
                <a-form-item label="操作属性">
                    <a-checkbox
                        v-if="Object.keys(item.props).indexOf('bbcode') >= 0"
                        v-model="item.props.bbcode"
                        >使用 BBCode</a-checkbox
                    >
                    <a-checkbox
                        v-if="Object.keys(item.props).indexOf('readonly') >= 0"
                        v-model="item.props.readonly"
                        >完全只读</a-checkbox
                    >
                    <a-checkbox
                        v-if="Object.keys(item.props).indexOf('disabled') >= 0"
                        v-model="item.props.disabled"
                        >禁用</a-checkbox
                    >
                    <a-checkbox
                        v-if="Object.keys(item.props).indexOf('editable') >= 0"
                        v-model="item.props.editable"
                        >文本框可输入</a-checkbox
                    >
                    <a-checkbox
                        v-if="Object.keys(item.props).indexOf('clearable') >= 0"
                        v-model="item.props.clearable"
                        >显示清除按钮</a-checkbox
                    >
                    <a-checkbox
                        v-if="
                            Object.keys(item.props).indexOf('arrowControl') >= 0
                        "
                        v-model="item.props.arrowControl"
                        >使用箭头进行时间选择</a-checkbox
                    >
                    <a-checkbox
                        v-if="
                            Object.keys(item.props).indexOf('multiServer') >= 0
                        "
                        v-model="item.props.multiServer"
                        >允许跨服</a-checkbox
                    >
                </a-form-item>
                <!-- <a-form-item laba="校验">
                    <div>
                        <a-checkbox v-model="data.options.required">必填</a-checkbox>
                    </div>
                    <a-saect
                        v-if="Object.keys(data.options).indexOf('dataType')>=0"
                        v-model="data.options.dataType"
                        size="mini"
                    >
                        <a-option value="string" laba="字符串" />
                        <a-option value="number" laba="数字" />
                        <a-option value="boolean" laba="布尔值" />
                        <a-option value="integer" laba="整数" />
                        <a-option value="float" laba="浮点数" />
                        <a-option value="url" laba="URL地址" />
                        <a-option value="email" laba="邮箱地址" />
                        <a-option value="hex" laba="十六进制" />
                    </a-saect>

                    <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
                        <a-input
                            v-model.lazy="data.options.pattern"
                            size="mini"
                            style=" width: 240px;"
                            placeholder="填写正则表达式"
                        />
                    </div>
                </a-form-item>-->
            </template>
        </a-form>
    </div>
    <div v-else>暂无</div>
</template>
<script>
import draggable from "vuedraggable";
export default {
    name: "FormItemConfig",
    components: {
        draggable,
    },
    props: {
        item: {
            type: Object,
            default: null,
        },
        data: {
            type: Object,
            default: {
                list: [],
            },
        },
        listKey: {
            type: [String, Number],
        },
    },
    data() {
        return {
            modelOptions: [],
            conditionType: "and",
            triggers: [
                {
                    label: "点击时(click)",
                    key: "click",
                    events: [],
                },
                {
                    label: "移开时(blur)",
                    key: "blur",
                    events: [],
                },
                {
                    label: "鼠标悬停时(hover)",
                    key: "hover",
                    events: [],
                },
            ],
        };
    },
    computed: {
        conditionOptions() {
            if (this.data.list[this.listKey].list.length == 0) {
                return [];
            } else {
                return this.data.list[this.listKey].list.map((item) => {
                    return {
                        value: item.model,
                        label: item.model,
                    };
                });
            }
        },
    },
    methods: {
        deleteEvents(item, _index) {
            this.item.eventsConfig[item.key].splice(_index, 1);
        },
        addEvents(item, index) {
            if (this.data.config.events.length > 0) {
                this.item.eventsConfig[item.key].push({
                    event: "",
                    // ...this.data.confog.events[0]
                });
            }
        },
        deleteCondition(index) {
            this.item.props.conditionConfig.conditions.splice(index, 1);
        },
        addCondition() {
            this.item.props.conditionConfig.conditions.push({
                modelName: "",
                type: "",
                value: "",
            });
        },
        handleOptionsRemove(index) {
            if (this.item.type === "grid" || this.item.type === "tab") {
                this.item.columns.splice(index, 1);
            } else {
                this.item.props.options.splice(index, 1);
            }
        },
        handleAddOption() {
            if (this.item.props.showLabel) {
                this.item.props.options.push({
                    value: "新选项值",
                    label: "新选项名",
                });
            } else {
                this.item.props.options.push({
                    value: "新选项",
                });
            }
        },
    },
    mounted() {
        console.log(this.item);
    },
};
</script>
<style lang="scss" scoped>
.trigger {
    padding: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
}
</style>>
