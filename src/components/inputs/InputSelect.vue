<template>
  <div class="mb-4">
    <label
      v-if="data.label"
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      for="data.label"
    >{{data.label}}</label>
    <div class="relative">
      <select
        v-on="data.listeners"
        v-model="data.input"
        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-state"
      >
        <option v-for="(option,i) in data.options" :key="i">{{option}}</option>
      </select>
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
      >
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    <div v-if="(data.live || formValidationFailed) && !data.valid">
      <span v-for="error in data.errors" :key="error" class="block text-sm text-red-600">{{error}}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { InputSelectProps } from "../../types";
  import { defineComponent } from "@vue/composition-api";
  export default defineComponent({
    props: {
      data: Object as () => InputSelectProps,
      formValidationFailed: Boolean
    }
  });
</script>

<style>
</style>