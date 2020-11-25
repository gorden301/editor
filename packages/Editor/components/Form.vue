<template>
    <a-form-model v-bind="data.config" class="widget-form-container">
        <draggable
            v-model="data.list[listKey].list"
            class="widget-form-list"
            v-bind="{group:'componentDragGroup', ghostClass: 'ghost'}"
            @end="handleMoveEnd"
            @add="handleWidgetAdd"
        >
            <template v-for="(element, index) in data.list[listKey].list">
                <template v-if="element.type === 'grid'">
                    <div
                        v-if="element && element.key"
                        :key="element.key"
                        class="widget-grid-container data-grid"
                        style="position: relative;"
                    >
                        <a-row
                            class="widget-grid"
                            type="flex"
                            :class="{active: select.key === element.key}"
                            :gutter="element.options.gutter ? element.options.gutter : 0"
                            :justify="element.options.justify"
                            :align="element.options.align"
                            @click.native="handleSelectWidget(index)"
                        >
                            <a-col
                                v-for="(col, colIndex) in element.columns"
                                :key="colIndex"
                                :span="col.span ? col.span : 0"
                            >
                                <div style="border: 1px dashed #999;">
                                    <draggable
                                        v-model="col.list"
                                        class="widget-form-list"
                                        style="padding-bottom: 50px;"
                                        filter="widget-grid-container"
                                        v-bind="{group:'componentDragGroup', ghostClass: 'ghost'}"
                                        @end="handleMoveEnd"
                                        @add="handleWidgetColAdd($event, element, colIndex)"
                                    >
                                        <form-item
                                            v-for="(el, i) in col.list"
                                            :key="el.key"
                                            :element="el"
                                            :select="select"
                                            :index="i"
                                            :data="col"
                                            @click.native="handleSelectWidget(i)"
                                        />
                                    </draggable>
                                </div>
                            </a-col>
                        </a-row>
                        <a-button
                            v-if="select.key === element.key"
                            title="删除"
                            style="bottom: -20px;"
                            icon="delete"
                            class="widget-action-delete"
                            shape="circle"
                            type="danger"
                            @click.stop="handleWidgetDelete(index)"
                        />
                    </div>
                </template>
                <!-- <template v-else-if="element.type == 'form'">

                </template> -->
                <template v-else-if="element.type === 'tab'">
                    <div
                        v-if="element && element.key"
                        :key="element.key"
                        class="widget-grid-container data-grid"
                        style="position: relative;"
                    >
                        <a-form-model-item
                            :label="element.props.hideLabel ? '' : element.name"
                            :label-width="(element.options.hideLabel ? '0px' : undefined)"
                            class="widget-grid"
                            :class="{active: select.key === element.key, 'is_req': element.options.required}"
                            @click.native="handleSelectWidget(index)"
                        >
                            <a-tabs
                                v-model="element.defaultValue"
                                :tab-position="element.options.tabPosition"
                                :type="element.options.type"
                                :class="element.options.class"
                            >
                                <a-tab-pane
                                    v-for="(col, colIndex) in element.columns"
                                    :key="col.name"
                                    :name="''+col.name"
                                    :tab="col.label ? col.label : 'Tab' + (colIndex + 1)"
                                >
                                    <tab-inline-form
                                        :size="element.options.formSize"
                                        :label-position="element.options.formLabelPosition"
                                        :label-width="element.options.formLabelWidth + 'px'"
                                        style="border: 1px dashed #999;"
                                    >
                                        <draggable
                                            v-model="col.list"
                                            class="widget-form-list"
                                            style="padding-bottom: 50px;"
                                            filter="widget-grid-container"
                                            v-bind="{group:'componentDragGroup', ghostClass: 'ghost'}"
                                            @end="handleMoveEnd"
                                            @add="handleWidgetColAdd($event, element, colIndex)"
                                        >
                                            <form-item
                                                v-for="(el, i) in col.list"
                                                :key="el.key"
                                                :element="el"
                                                :select="select"
                                                :index="i"
                                                :data="col"
                                                @click.native="handleSelectWidget(i)"
                                            />
                                        </draggable>
                                    </tab-inline-form>
                                </a-tab-pane>
                            </a-tabs>
                        </a-form-model-item>
                        <a-button
                            v-if="select.key === element.key"
                            title="删除"
                            style="bottom: -20px;"
                            icon="delete"
                            class="widget-action-delete"
                            shape="circle"
                            type="danger"
                            @click.stop="handleWidgetDelete(index)"
                        />
                    </div>
                </template>
                <!-- <template v-else-if="element.type === 'formTemplate'">
          <div
            v-if="element && element.key"
            :key="element.key"
            class="widget-grid-container data-grid"
            style="position: relative;"
          >
            <a-form-model-item
              :label="element.options.hideLabel ? '':element.name"
              :label-width="(element.options.hideLabel ? '0px' : undefined)"
              class="widget-grid"
              :class="{active: select.key === element.key, 'is_req': element.options.required}"
            >
              <div
                v-for="(col, colIndex) in element.list"
                :key="colIndex"
                :label="col.name ? col.name : 'Tab' + (colIndex + 1)"
              >
                <draggable
                  v-model="col.list"
                  class="widget-form-list"
                  style="padding-bottom: 50px;"
                  filter="widget-grid-container"
                  v-bind="{group:'componentDragGroup', ghostClass: 'ghost'}"
                  @end="handleMoveEnd"
                  @add="handleWidgetColAdd($event, element, colIndex)"
                >
                  <form-item
                    v-if="col.key"
                    :key="col.key"
                    :element="col"
                    :select="select"
                    :index="colIndex"
                    :data="element"
                    @click.native="handleSelectWidget(colIndex)"
                  />
                </draggable>
              </div>
            </a-form-model-item>
            <a-button
              v-if="select.key === element.key"
              title="删除"
              style="bottom: -20px;"
              icon="delete"
              class="widget-action-delete"
              shape="circle"
              type="danger"
              @click.stop="handleWidgetDelete(index)"
            />
          </div>
                </template>-->
                <template v-else>
                    <form-item
                        v-if="element && element.key"
                        :key="element.key"
                        :element="element"
                        :select="select"
                        :curIndex="data.list[listKey].list[index].curIndex"
                        :index="index"
                        :data="data"
                        :listKey="listKey"
                        @click.native="handleSelectWidget(index)"
                    />
                </template>
            </template>
        </draggable>
    </a-form-model>
</template>

<script>
import draggable from "vuedraggable";
import formItem from "./FormItem.vue";
import tabInlineForm from './tabInlineForm'
// import tabInlineForm from './tabInlineForm.vue'
export default {
    components: {
        tabInlineForm,
        draggable,
        formItem,
    },
    props: {
        data: {
            type: Object,
            default: Object,
        },
        select: {
            type: Object,
            default: Object,
        },
        listKey: {
            type: [String, Number]
        }
    },
    data() {
        return {
            currentList: [],
            step: -1,
            formHistory: []
        };
    },
    watch: {
        // listKey: {
        //     deep: true,
        //     handler(val) {
        //         this.currentList = this.data.list[val]
        //         this.currentList.splice()
        //     },
        // },
        // currentList: {
        //     deep: true,
        //     handler(val) {
                
        //     },
        // },
    },
    mounted() {
        document.body.ondrop = function (event) {
            const isFirefox =
                navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
            if (isFirefox) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        this.currentList = this.data.list[this.listKey]
    },
    methods: {
        handleMoveEnd({ newIndex, oldIndex }) {
        },
        handleSelectWidget(index) {
            this.$emit("item-select-event", this.data.list[this.listKey].list[index]);
        },
        handleWidgetAdd(evt) {
            console.log(evt);
            const newIndex = evt.newIndex;
            if(this.data.list[this.listKey].list[newIndex].type == 'form') {
                delete this.data.list[this.listKey].list[newIndex].list
                this.data.list[this.listKey].list[newIndex].dragForm = true
            }
            // if(evt.from.dataset.key) {
            //     this.data.list[this.listKey].list.splice(newIndex, 0, {
            //         type: evt.from.dataset.type,
            //         keyName: evt.from.dataset.key
            //     })
            // }
            // 为拖拽到容器的元素添加唯一 key
            const type = this.data.list[this.listKey].list[newIndex].type;
            const key =
                ".key." +
                type +
                "." +
                Date.parse(new Date()) +
                "." +
                Math.ceil(Math.random() * 99999);
            this.$set(this.data.list[this.listKey].list, newIndex, {
                ...this.data.list[this.listKey].list[newIndex],
                options: {
                    ...this.data.list[this.listKey].list[newIndex].options,
                },
                key,
                // 绑定键值
                model: type,
                rules: [],
            });
            if (
                this.data.list[this.listKey].list[newIndex].type === "radio" ||
                this.data.list[this.listKey].list[newIndex].type === "checkbox" ||
                this.data.list[this.listKey].list[newIndex].type === "select"
            ) {
                this.$set(this.data.list[this.listKey].list, newIndex, {
                    ...this.data.list[this.listKey].list[newIndex],
                    options: {
                        ...this.data.list[this.listKey].list[newIndex].options,
                        options: this.data.list[this.listKey].list[newIndex].props.options.map(
                            (item) => ({
                                ...item,
                            })
                        ),
                    },
                });
            }
            if (
                this.data.list[this.listKey].list[newIndex].type === "grid" ||
                this.data.list[this.listKey].list[newIndex].type === "tab"
            ) {
                this.$set(this.data.list[this.listKey].list, newIndex, {
                    ...this.data.list[this.listKey].list[newIndex],
                    columns: this.data.list[this.listKey].list[newIndex].columns.map((item) => ({
                        ...item,
                    })),
                });
            }

            if (this.data.list[this.listKey].list[newIndex].type === "formTemplate") {
                console.log(this.data.list[this.listKey].list[newIndex]);
                this.$emit("upload-template", this.data.list[this.listKey].list[newIndex]);
            }
            this.step ++
            this.formHistory.push(this.data.list[this.listKey].list)
            this.$emit("item-select-event", this.data.list[this.listKey].list[newIndex]);
            this.$emit("addTree", this.data.list[this.listKey].list[newIndex])
        },
        handleWidgetColAdd($event, row, colIndex) {
            console.log("coladd", $event, row, colIndex);
            const newIndex = $event.newIndex;
            const oldIndex = $event.oldIndex;
            const item = $event.item;
            // 防止布局元素的嵌套拖拽
            if (item.className.indexOf("data-grid") >= 0) {
                // 如果是列表中拖拽的元素需要还原到原来位置
                item.tagName === "DIV" &&
                    this.data.list.splice(
                        oldIndex,
                        0,
                        row.columns[colIndex].list[newIndex]
                    );
                row.columns[colIndex].list.splice(newIndex, 1);
                return false;
            }
            if(row.columns[colIndex].list[newIndex].type == 'form') {
                delete row.columns[colIndex].list[newIndex].list
                row.columns[colIndex].list[newIndex].dragForm = true
            }
            const type = row.columns[colIndex].list[newIndex].type;
            const key =
                ".key." +
                type +
                "." +
                Date.parse(new Date()) +
                "." +
                Math.ceil(Math.random() * 99999);
            this.$set(row.columns[colIndex].list, newIndex, {
                ...row.columns[colIndex].list[newIndex],
                options: {
                    ...row.columns[colIndex].list[newIndex].options,
                },
                key,
                // 绑定键值
                model: type,
                rules: [],
            });
            const tmp = row.columns[colIndex].list[newIndex];
            if (
                tmp.type === "radio" ||
                tmp.type === "checkbox" ||
                tmp.type === "select"
            ) {
                this.$set(row.columns[colIndex].list, newIndex, {
                    ...tmp,
                    options: {
                        ...tmp.options,
                        options: tmp.options.options.map((item) => ({
                            ...item,
                        })),
                    },
                });
            }
            this.$emit(
                "item-select-event",
                row.columns[colIndex].list[newIndex]
            );
        },
        handleWidgetDelete(index) {
            if (this.data.list[this.listKey].list.length - 1 === index) {
                if (index === 0) {
                    this.$emit("item-select-event", {});
                } else {
                    this.$emit("item-select-event", this.data.list[this.listKey].list[index - 1]);
                }
            } else {
                this.$emit("item-select-event", this.data.list[this.listKey].list[index + 1]);
            }
            this.$nextTick(() => {
                this.data.list[this.listKey].list.splice(index, 1);
            });
            this.$emit("item-select-event", {});
        },
    },
};
</script>
