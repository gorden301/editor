const Editor = {}
Editor.components = [
    {
        type: 'input',
        category: 'basic',
        name: '单行文本',
        icon: 'icon-input',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            placeholder: '',
            addonAfter: '',
            addonBefore: '',
            defaultValue: '',
            disabled: false,
            id: '',
            maxLength: 0,
            prefix: '',
            suffix: '',
            type: '',
            allowClear: '',
        },
        style: {
            width: '',
            height: ''
        },
        class: {
        },
        attrs: {
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        on: {
        },
        nativeOn: {
        },
        options: {
            required: false,
            dataType: 'string',
            pattern: ''
        }
    },
    {
        type: 'textarea',
        category: 'basic',
        name: '多行文本',
        icon: 'icon-diy-com-textarea',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            placeholder: '',
            addonAfter: '',
            addonBefore: '',
            defaultValue: '',
            disabled: false,
            id: '',
            maxLength: 0,
            prefix: '',
            suffix: '',
            type: '',
            allowClear: ''
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {
            width: ''
        },
        class: {
        },
        attrs: {
        },
        on: {
        },
        nativeOn: {
        },
        options: {
            required: false,
            pattern: ''
        }
    },
    {
        type: 'radio',
        category: 'basic',
        name: '单选框组',
        icon: 'icon-radio-active',
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            inline: false,
            defaultValue: '',
            showLabel: false,
            options: [
                {
                    value: '选项1',
                    label: '选项1'
                },
                {
                    value: '选项2',
                    label: '选项2'
                },
                {
                    value: '选项3',
                    label: '选项3'
                }
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: ''
        },
        style: {
            width: '',
            display: 'block'
        }
    },
    {
        type: 'checkbox',
        category: 'basic',
        name: '多选框组',
        icon: 'icon-check-box',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            inline: false,
            defaultValue: [],
            showLabel: false,
            options: [
                {
                    value: '选项1'
                },
                {
                    value: '选项2'
                },
                {
                    value: '选项3'
                }
            ],
            required: false,
            width: '',
            remote: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: ''
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {
            width: '',
            display: 'block'
        }
    },
    {
        type: 'time',
        category: 'basic',
        name: '时间选择器',
        icon: 'icon-time',
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            allowClear: false,
            defaultValue: null,
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '请选择时间',
            startPlaceholder: '',
            endPlaceholder: '',
            isRange: false,
            arrowControl: true,
            format: 'HH:mm:ss',
            required: false,
            width: ''
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {
            width: ''
        }
    },
    {
        type: 'date',
        category: 'basic',
        name: '日期选择器',
        icon: 'icon-date',
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {
            width: ''
        },
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            defaultValue: '',
            readonly: false,
            disabled: false,
            editable: true,
            clearable: true,
            placeholder: '',
            startPlaceholder: '',
            endPlaceholder: '',
            type: 'date',
            format: 'yyyy-MM-dd',
            timestamp: false,
            required: false,
            width: ''
        }
    },
    {
        type: 'rate',
        category: 'basic',
        name: '评分',
        icon: 'icon-icon-test',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            defaultValue: null,
            count: 5,
            allowHalf: false,
            // disabled: false,
            allowHalf: false,
            required: false
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {
        }
    },
    {
        type: 'select',
        category: 'basic',
        name: '下拉选择框',
        icon: 'icon-select',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            fatherType: 'select',
            defaultValue: '',
            multiple: false,
            disabled: false,
            clearable: false,
            placeholder: '',
            required: false,
            showLabel: false,
            width: '',
            options: [
                {
                    label: '下拉框1',
                    value: '1'
                }, {
                    label: '下拉框2',
                    value: '2'
                }, {
                    label: '下拉框3',
                    value: '3'
                }
            ],
            remote: false,
            filterable: false,
            remoteOptions: [],
            props: {
                value: 'value',
                label: 'label'
            },
            remoteFunc: ''
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {}
    },
    {
        type: 'switch',
        category: 'basic',
        name: '开关',
        icon: 'icon-switch',
        props: {
            defaultValue: false,
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            required: false,
            disabled: false
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {}
    },
    {
        type: 'slider',
        category: 'basic',
        name: '滑块',
        icon: 'icon-slider',
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
            defaultValue: 0,
            disabled: false,
            required: false,
            min: 0,
            max: 100,
            step: 1,
            showInput: false,
            range: false,
            width: ''
        },
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        style: {}
    },
    {
        type: 'grid',
        category: 'layout',
        name: '栅格布局',
        icon: 'icon-grid-',
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        columns: [
            {
                span: 12,
                list: []
            },
            {
                span: 12,
                list: []
            }
        ],
        options: {
            gutter: 0,
            justify: 'start',
            align: 'top'
        },
        props: {
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
        },
    },
    {
        type: 'tab',
        category: 'layout',
        name: 'Tab切换',
        icon: 'fa fa-window-restore',
        defaultValue: '0',
        eventsConfig: {
            'click': [],
            'blur': [],
            'hover': []
        },
        columns: [
            {
                label: '标签1',
                name: '0',
                list: []
            },
            {
                label: '标签2',
                name: '1',
                list: []
            }
        ],
        options: {
            hideLabel: false,
            type: '',
            tabPosition: 'top',
            formLabelPosition: 'top',
            formLabelWidth: 80,
            formSize: 'small',
            class: ''
        },
        style: {
            width: '',
            height: ''
        },
        props: {
            tabPosition: 'top',
            hideLabel: false,
            conditionConfig: {
                allowCondition: false,
                type: 'and',
                conditions: []
            },
        },
    }
]
Editor.setComponent = (param) => {
    if (Array.isArray(Editor.components)) {
        Editor.components = [...Editor.components, ...param]
        Editor.components.splice()
    } else {
        Editor.components.push(param)
    }
}

export default Editor
