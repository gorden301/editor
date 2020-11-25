<template>
    <div :class="[
    labelPosition ? 'el-form--label-' + labelPosition : '',
    { 'el-form--inline': inline }
  ]">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TabElForm',
    componentName: 'ElForm',
    provide() {
        return {
            elForm: this
        };
    },
    props: {
        labelPosition: {
            type: String
        },
        labelWidth: {
            type: String
        },
        labelSuffix: {
            type: String,
            default: ''
        },
        inline: {
            type: Boolean
        },
        inlineMessage: {
            type: Boolean
        },
        statusIcon: {
            type: Boolean
        },
        showMessage: {
            type: Boolean,
            default: true
        },
        size: {
            type: String
        },
        disabled: {
            type: Boolean
        },
        validateOnRuleChange: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        rules() {
            if (this.form.validateOnRuleChange) {
                this.validate(() => {});
            }
        }
    },
    computed: {
        form() {
            let parent = this.$parent;
            let parentName = parent.$options.componentName;
            while (parentName !== 'ElForm') {
                parent = parent.$parent;
                parentName = parent.$options.componentName;
            }
            return parent;
        },
        autoLabelWidth() {
            if (!this.potentialLabelWidthArr.length) return 0;
            const max = Math.max(...this.potentialLabelWidthArr);
            return max ? `${max}px` : '';
        },
        model() {
            return this.form.model;
        },
        fields() {
            return this.form.fields;
        },
        rules() {
            return this.form.rules;
        },
        hideRequiredAsterisk() {
            return this.form.hideRequiredAsterisk;
        }
    },
    data() {
        return {
            potentialLabelWidthArr: []
        };
    },
    created() {
        this.$on('el.form.addField', (field) => {
            this.form.$emit('el.form.addField', field);
        });
        /* istanbul ignore next */
        this.$on('el.form.removeField', (field) => {
            this.form.$emit('el.form.removeField', field);
        });
        this.$on('validate', () => {
            this.form.$emit('validate', arguments);
        });
    },
    methods: {
        resetFields() {
            return this.form.resetFields.apply(this.form, arguments);
        },
        clearValidate(props = []) {
            return this.form.clearValidate.apply(this.form, arguments);
        },
        validate(callback) {
            return this.form.validate.apply(this.form, arguments);
        },
        validateField(props, cb) {
            return this.form.validateField.apply(this.form, arguments);
        },
        getLabelWidthIndex(width) {
            const index = this.potentialLabelWidthArr.indexOf(width);
            // it's impossible
            if (index === -1) {
                throw new Error('[ElementForm]unpected width ', width);
            }
            return index;
        },
        registerLabelWidth(val, oldVal) {
            if (val && oldVal) {
                const index = this.getLabelWidthIndex(oldVal);
                this.potentialLabelWidthArr.splice(index, 1, val);
            } else if (val) {
                this.potentialLabelWidthArr.push(val);
            }
        },
        deregisterLabelWidth(val) {
            const index = this.getLabelWidthIndex(val);
            this.potentialLabelWidthArr.splice(index, 1);
        }
    },
};
</script>