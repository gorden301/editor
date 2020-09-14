<template>
    <a-layout class="xd-pe-container">
        <a-layout-header style="background: #fff;" class="xd-pe-toolbar">
            <span>
                <a-button type="default" @click="newConf">新建</a-button>
                <a-button type="default" @click="handlePreview">打开</a-button>
                <a-button type="default" @click="handlePreview">保存</a-button>
                <a-button type="default" @click="handlePreview">预览</a-button>
            </span>
            <a-radio-group v-model="pageShow" button-style="solid">
                <a-radio-button value="a">页面</a-radio-button>
                <a-radio-button value="b">构成</a-radio-button>
                <a-radio-button value="c">事件</a-radio-button>
            </a-radio-group>
            <span>
                <!-- <a-button
          v-if="upload"
          type="default"
          icon="el-icon-upload2"
          @click="handleUpload"
                >导入配置</a-button>-->
                <a-button type="default" @click="handleGenerateJson">查看配置</a-button>
            </span>
        </a-layout-header>
        <a-layout-content class="xd-pe-main">
            <a-layout style="height:100%;" v-show="pageShow == 'b'">
                <a-layout-content>
                    <a-tree :tree-data="treeData" :replace-fields="replaceFields" :autoExpandParent="true"></a-tree>
                </a-layout-content>
            </a-layout>
            <a-layout style="height: 100%;" v-show="pageShow == 'a'">
                <a-layout-sider class="components-list" width="250">
                    <a-tabs tab-position="left" style="height: 100%;">
                        <a-tab-pane key="1">
                            <a-icon slot="tab" type="form" />
                            <draggable
                                tag="ul"
                                :list="baseComponentsBuildIn"
                                :clone="clone"
                                @end="handleMoveEnd"
                                @start="handleMoveStart"
                                v-bind="{group:{ name:'componentDragGroup', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                            >
                                <li
                                    v-for="(item, index) in baseComponentsBuildIn"
                                    :key="index"
                                    class="form-edit-widget-label"
                                >
                                    <a>
                                        <i class="icon iconfont" :class="item.icon" />
                                        <span>{{ item.name }}</span>
                                    </a>
                                </li>
                            </draggable>
                            <draggable
                                tag="ul"
                                :list="basicComponents.ext"
                                v-bind="{group:{ name:'componentDragGroup', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                            >
                                <li
                                    v-for="(item, index) in basicComponents.ext"
                                    :key="index"
                                    class="form-edit-widget-label"
                                >
                                    <a>
                                        <i class="icon iconfont" :class="item.icon" />
                                        <span>{{ item.name }}</span>
                                    </a>
                                </li>
                            </draggable>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <a-icon slot="tab" type="column-width" />
                            <draggable
                                tag="ul"
                                :list="advanceComponents.buildIn"
                                v-bind="{group:{ name:'componentDragGroup', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                            >
                                <li
                                    v-for="(item, index) in advanceComponents.builtIn"
                                    :key="index"
                                    class="form-edit-widget-label"
                                >
                                    <a>
                                        <i class="icon iconfont" :class="item.icon" />
                                        <span>{{ item.name }}</span>
                                    </a>
                                </li>
                            </draggable>
                        </a-tab-pane>
                        <a-tab-pane key="3">
                            <a-icon slot="tab" type="experiment" />
                            <draggable
                                tag="ul"
                                :list="layoutComponents.buildIn"
                                v-bind="{group:{ name:'componentDragGroup', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                            >
                                <li
                                    v-for="(item, index) in layoutComponents.buildIn"
                                    :key="index"
                                    class="form-edit-widget-label data-grid"
                                >
                                    <a>
                                        <i class="icon iconfont" :class="item.icon" />
                                        <span>{{ item.name }}</span>
                                    </a>
                                </li>
                            </draggable>
                        </a-tab-pane>
                    </a-tabs>
                </a-layout-sider>
                <a-layout-content :class="{'widget-empty': widgetForm.list.length === 0}">
                    <form-widget
                        v-if="$props.type === 'form'"
                        :data="widgetForm"
                        :select="selectedItem"
                        @item-select-event="onSelectionChange"
                        @upload-template="setJSON"
                        @addTree="addTree"
                    />
                    <page-widget
                        v-else-if="$props.type === 'page'"
                        :data="widgetForm"
                        :select="selectedItem"
                        @item-select-event="onSelectionChange"
                        @upload-template="setJSON"
                    />
                </a-layout-content>

                <a-layout-sider
                    style="background: #fff;"
                    class="widget-config-container"
                    width="320"
                >
                    <a-layout>
                        <a-layout-header style="background: #fff;padding: 0;">
                            <div
                                class="config-tab"
                                :class="{active: configTab === 'widget'}"
                                @click="handleConfigSelect('widget')"
                            >字段属性</div>
                            <div
                                class="config-tab"
                                :class="{active: configTab === 'form'}"
                                @click="handleConfigSelect('form')"
                            >表单属性</div>
                        </a-layout-header>
                        <a-layout-content class="config-content">
                            <formItemConf
                                v-if="$props.type === 'form'"
                                v-show="configTab === 'widget'"
                                :item="selectedItem"
                                :data="widgetForm"
                            />
                            <pageItemConf
                                v-else-if="$props.type === 'page'"
                                v-show="configTab === 'widget'"
                                :item="selectedItem"
                            />
                            <form-config
                                v-if="$props.type === 'form'"
                                v-show="configTab === 'form'"
                                :data="widgetForm.config"
                            />
                            <page-config
                                v-else-if="$props.type === 'page'"
                                v-show="configTab === 'form'"
                                :data="widgetForm.config"
                            />
                        </a-layout-content>
                    </a-layout>
                </a-layout-sider>
            </a-layout>
        </a-layout-content>
        <pre-dialog
            ref="widgetPreview"
            :visible="previewVisible"
            width="1000px"
            title="表单预览"
            form
            @on-close="previewVisible = false"
        >
            <generate-form
                v-if="previewVisible"
                ref="generateForm"
                insite="true"
                :data="widgetForm"
                :value="widgetModels"
            >
                <!--
            <template v-slot:blank="scope">
              宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
              高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
            </template>
                -->
            </generate-form>
        </pre-dialog>
    </a-layout>
</template>

<script>
import draggable from "vuedraggable";
import builtInComponents from "../builtInComponents";
// import { deepClone } from "../utils/utils";
// import GenerateForm from './components/GenerateForm'
export default {
    name: "XdFormEditor",
    components: {
        draggable,
        formConfig: () => import("./components/FormConfig"),
        formWidget: () => import("./components/Form"),
        formItemConf: () => import("./components/FormItemConfig"),
        pageConfig: () => import("./components/PageConfig"),
        pageWidget: () => import("./components/Page"),
        pageItemConf: () => import("./components/PageItemConfig"),
        preDialog: () => import("./components/PreDialog"),
        generateForm: () => import("./components/GenerateForm"),
    },
    props: {
        extList: {
            type: Array,
            default: Array,
        },
        type: {
            type: String,
            default: "page",
        },
    },
    data() {
        return {
            replaceFields: {
                title: 'name',
                key: 'model'
            },
            widgetForm: {
                config: {},
                list: [],
            },
            treeData: [
                {
                    name: '表单',
                    model: 'form',
                    children: []
                }
            ],
            pageShow: 'a',
            modified: false,
            configTab: "widget",
            selectedItem: {},
            previewVisible: false,
            jsonVisible: false,
            codeVisible: false,
            uploadVisible: false,
            widgetModels: {},
            htmlTemplate: "",
            widgetModels: {},
            jsonTemplate: "",
            jsonCopy: JSON.parse(JSON.stringify(builtInComponents)),
            baseComponentsBuildIn: JSON.parse(
                JSON.stringify(builtInComponents)
            ).reduce((acc, cur) => {
                if (!acc[cur.category]) {
                    acc[cur.category] = [];
                }
                acc[cur.category].push(cur);
                return acc;
            }, {}).basic,
        };
    },
    computed: {
        handleTest() {},
        formattedJSON() {
            return JSON.stringify(this.getJson(), null, "  ");
        },
        builtInByCategory() {
            return this.jsonCopy.reduce((acc, cur) => {
                if (!acc[cur.category]) {
                    acc[cur.category] = [];
                }
                acc[cur.category].push(cur);
                return acc;
            }, {});
        },
        extByCategory() {
            return this.$props.extList.reduce((acc, cur) => {
                if (!acc[cur.category]) {
                    acc[cur.category] = [];
                }
                acc[cur.category].push(cur);
                return acc;
            }, {});
        },
        basicComponents() {
            return {
                buildIn: JSON.parse(
                    JSON.stringify(this.builtInByCategory.basic)
                ),
                ext: this.extByCategory.basic,
            };
        },
        advanceComponents() {
            return {
                buildIn: this.builtInByCategory.advance,
                ext: this.extByCategory.advance,
            };
        },
        layoutComponents() {
            return {
                buildIn: this.builtInByCategory.layout,
                ext: this.extByCategory.layout,
            };
        },
    },
    watch: {
        baseComponentsBuildIn: {
            handler(newVal, oldVal) {
                console.log(newVal);
            },
            deep: true,
        },
        // widgetForm: {
        //     deep: true,
        //     handler: function (val) {
        //         debugger;
        //     },
        // },
    },
    mounted() {
        this.$nextTick(() => {});
    },
    methods: {
        addTree(item) {
            console.log('===============>插入树元素', item)
            this.treeData[0].children.push(item)
        },
        clone(el) {
            return this.deepClone(el)
        },
        deepClone(element) {
            if (!(typeof element === "object")) return element;
            if (element === null) return null;
            return element instanceof Array
                ? element.map((item) => this.deepClone(item))
                : Object.entries(element).reduce(
                      (pre, [key, val]) => ({ ...pre, [key]: this.deepClone(val) }),
                      {}
                  );
        },
        handleMoveEnd({ item }) {
            // console.log('end-left', newIndex, oldIndex, evt)
        },
        handleMoveStart({ item }) {
            // console.log('start-left', oldIndex, this.basicComponents)
        },
        onSelectionChange(obj) {
            this.selectedItem = obj;
            console.log("当前选中元素=============>", this.selectedItem);
        },
        handleConfigSelect(value) {
            this.configTab = value;
        },
        handlePreview() {
            this.previewVisible = true;
        },
        handleGenerateJson() {
            this.jsonTemplate = this.getJson();
            this.jsonVisible = true;
        },
        getJson() {
            const opt = this.$merge({}, this.widgetForm);
            const minify = function (list) {
                list.forEach((item) => {
                    delete item.icon;
                    delete item.key;
                    if (item.type === "grid" || item.type === "tab") {
                        item.columns.forEach((tmp) => {
                            minify(tmp.list);
                        });
                    }
                });
            };

            minify(opt.list);

            return opt;
        },
        setJSON(json) {
            console.log(json);
            if (typeof json !== "object") {
                return false;
            }
            json = JSON.parse(JSON.stringify(json));
            const genOpt = function (list) {
                list.forEach((item) => {
                    delete item.icon;
                    item.key =
                        ".key." +
                        Date.parse(new Date()) +
                        "_" +
                        Math.ceil(Math.random() * 99999);

                    if (item.type === "grid" || item.type === "tab") {
                        item.columns.forEach((tmp) => {
                            genOpt(tmp.list);
                        });
                    }
                });
            };
            genOpt(json.list);
            this.widgetForm = json;

            if (json.list.length > 0) {
                this.selectedItem = json.list[0];
            }
            this.modified = false;
        },
        newConf() {
            this.selectedItem = {};
            this.setJSON({
                config: {},
                list: [],
            });
        },
    },
};
</script>

<style lang="scss">
/* stylelint-disable */
$primary-color: #7ab8ff;
$primary-background-color: #ecf5ff;

.fa-icon {
    height: 1em;
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
    width: auto;
}

.xd-pe-toolbar {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
}

.xd-pe-container {
    *,
    ::after,
    ::before {
        box-sizing: border-box;
    }

    .tabs-material * {
        box-sizing: initial;
    }

    background: #fff;
    height: 100%;

    .a-layout {
        height: 100% !important;
    }

    > .a-layout {
        background: #fff;
    }

    .xd-pe-main {
        position: relative;

        > .a-layout {
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    main {
        padding: 0;
    }
}

.center-container {
    border-left: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    padding-right: 10px;

    .btn-bar {
        border-bottom: solid 2px #e4e7ed;
        font-size: 18px;
        height: 45px;
        line-height: 38px;
        text-align: right;
    }

    .a-layout-content {
        padding: 0;
        position: relative;
    }
}

aside.components-list {
    background: #fff;
    height: 100%;

    .ant-tabs-content {
        padding: 0;
    }

    ul {
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: relative;
    }

    .form-edit-widget-label {
        color: #333;
        display: block;
        font-size: 12px;
        left: 0;
        line-height: 26px;
        margin: 12px;
        overflow: hidden;
        position: relative;
        text-overflow: ellipsis;
        white-space: nowrap;

        & > a {
            cursor: move;
            display: block;

            .icon {
                display: inline-block;
                font-size: 14px;
                margin-left: 8px;
                margin-right: 6px;
                vertical-align: middle;
            }

            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
}

.widget-form-container {
    .widget-form-list {
        height: 100%;
        padding-bottom: 150px;

        .widget-view {
            border-left: 5px solid transparent;
            margin: 0;
            padding: 5px 10px 18px;
            position: relative;

            &.is_req {
                .el-form-item__label::before {
                    color: #f56c6c;
                    content: "*";
                    margin-right: 4px;
                }
            }

            &::after {
                bottom: 0;
                display: block;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                z-index: 1001;
            }

            &:hover {
                background: $primary-background-color;
                border-left: 5px solid $primary-background-color;
            }

            &.active {
                background: #def1ff;
                border-left: 5px solid #98d0ff;
            }
        }

        .widget-action-delete {
            bottom: -35px;
            -webkit-box-sizing: initial;
            box-sizing: initial;
            font-size: 16px;
            height: 2.2em;
            padding: 0;
            position: absolute;
            right: 20px;
            width: 2.2em;
            z-index: 1009;
        }

        .widget-action-clone {
            bottom: -35px;
            -webkit-box-sizing: initial;
            box-sizing: initial;
            font-size: 16px;
            height: 2.2em;
            padding: 0;
            position: absolute;
            right: 70px;
            width: 2.2em;
            z-index: 1009;
        }
    }

    .widget-grid {
        border-left: 5px solid transparent;
        margin: 0 !important;
        padding: 5px;
        position: relative;

        &.active {
            background: #d3eaff;
            border-left: 5px solid #98d0ff;
        }
    }

    .widget-grid-container {
        &.ghost {
            &::after {
                background: #fff;
                bottom: 0;
                content: "";
                display: block;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                z-index: 10;
            }
        }
    }

    .ghost {
        background: #fff;
        border: 1px dashed $primary-color;

        // border-top: 5px solid black;
        &::after {
            background: #fff;
        }
    }

    li.ghost {
        font-size: 0;
        height: 30px;
        list-style: none;
    }
}

.widget-config-container {
    position: relative;

    .ant-layout {
        background: none;
    }

    .config-tab {
        cursor: pointer;
        display: inline-block;
        font-size: 14px;
        font-weight: 500;
        height: 45px;
        line-height: 45px;
        position: relative;
        text-align: center;
        width: 50%;
        &.active {
            border-bottom: solid 2px $primary-color;
        }
    }

    .config-content {
        padding: 10px;

        .el-form-item__label {
            font-weight: 500;
            padding: 0;
        }
    }

    .ghost {
        background: #fff;
        border: 1px dashed $primary-color;

        &::after {
            background: #fff;
            bottom: 0;
            content: "";
            display: block;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
        }
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li.ghost {
        display: block;
        font-size: 0;
        list-style: none;
        position: relative;
    }
}

.viewer-container {
    z-index: 99999 !important;
}

.code-textarea {
    background-color: #f4f4f4;
    border: 1px solid #eee;
    font-family: monospace;
    height: 400px;
    margin: 0 -10px;
    outline: none;
    overflow: auto;
    padding: 10px;
    resize: none;
    white-space: pre;
    width: 100%;
}
</style>
