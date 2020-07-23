<template>
  <form @submit.prevent="validate">
    <slot></slot>
    <input
      :class="[!formValue.valid ? ['bg-gray-500','hover:bg-gray-700 '] :  ['bg-blue-500','hover:bg-blue-700 '] ]"
      type="submit"
      value="SUBMIT "
      class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    />
  </form>
</template>

<script lang="ts">
  import { IForm, IFormData } from "../types";
  import {
    defineComponent,
    provide,
    ref,
    Ref,
    computed,
    ComputedRef,
    watch
  } from "@vue/composition-api";
  import useFormValidator from "../use/useFormValidator";
  export default defineComponent({
    model: {
      prop: "formValue",
      event: "input"
    },
    props: {
      formValue: {
        type: Object as () => IForm,
        default: () => ({})
      }
    },
    setup(props, context) {
      let formData: Ref<IFormData> = ref({});
      let formValidationFailed: Ref<Boolean> = ref(false);
      provide("formData", formData);
      provide("formValidationFailed", formValidationFailed);
      useFormValidator(formData, (value: IForm) => context.emit("input", value));

      function validate() {
        if (props.formValue.valid) {
          context.emit("submit", props.formValue);
        } else {
          formValidationFailed.value = true;
          return {};
        }
      }
      return {
        formData,
        validate,
        formValidationFailed
      };
    }
  });
</script>

<style>
</style>