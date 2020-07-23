<template>
  <component :is="componentType" :data="inputData" :formValidationFailed="formValidationFailed"></component>
</template>
<script lang="ts">
  import Vue from "vue";
  import { Rule, IFormData } from "../types";
  import { parseRules, parseSelectOptions } from "../libs/utils";
  import useInputValidator from "../use/useInputValidator";
  import {
    ComputedRef,
    computed,
    defineComponent,
    inject,
    ref,
    Ref,
    onMounted,
    onUpdated,
    onBeforeUpdate
  } from "@vue/composition-api";
  import InputText from "./inputs/InputText.vue";
  import InputSelect from "./inputs/InputSelect.vue";
  export default defineComponent({
    name: "FormInput",
    props: {
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      value: {
        type: String,
        default: ""
      },
      options: {
        type: String,
        default: ""
      },
      label: String,
      placeholder: String,
      validation: {
        type: String,
        default: ""
      },
      live: {
        type: Boolean,
        default: true
      }
    },
    setup(props, context) {
      let formData: Ref<IFormData> | undefined = inject("formData");
      let formValidationFailed: Ref<Boolean> | undefined = inject(
        "formValidationFailed"
      );
      let inputData: Ref<any> = ref({});
      const Rules: ComputedRef<Rule[]> = computed(() =>
        parseRules(props.validation)
      );

      const SelectOptions: ComputedRef<String[]> = computed(() =>
        parseSelectOptions(props.options)
      );

      const onValidate = (value: string, valid: Boolean) => {
        if (!formData!.value[props.name]) {
          value &&
            context.root.$set(formData!.value, props.name, {
              value
            });
          context.root.$set(formData!.value, props.name, {
            valid
          });
        } else {
          formData!.value[props.name] = {
            value,
            valid
          };
        }
        context.emit("input", value);
      };
      const { input, errors, valid } = useInputValidator(
        props.value,
        Rules.value,
        onValidate
      );
      const listeners = computed(() => {
        const { input, ...listeners } = context.listeners;
        return listeners;
      });

      const componentType = props.type === "select" ? InputSelect : InputText;

      inputData.value = {
        ...props,
        options: SelectOptions.value,
        valid,
        input,
        errors,
        listeners
      };
      return {
        formValidationFailed,
        componentType,
        inputData
      };
    }
  });
</script>

<style>
</style>