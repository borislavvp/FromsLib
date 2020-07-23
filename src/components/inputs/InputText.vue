<template>
  <div class="mb-4">
    <label
      v-if="data.label"
      class="block text-gray-700 text-sm font-bold mb-2"
      :for="data.label"
    >{{data.label}}</label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="data.type"
      v-model="data.input"
      v-on="data.listeners"
      :placeholder="data.placeholder"
    />
    <div v-if="(data.live || formValidationFailed) && !data.valid">
      <span v-for="error in data.errors" :key="error" class="block text-sm text-red-600">{{error}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { InputTextProps } from "../../types";
  import { defineComponent } from "@vue/composition-api";
  export default defineComponent({
    props: {
      data: Object as () => InputTextProps,
      formValidationFailed: Boolean
    }
  });
</script>