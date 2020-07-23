<template>
  <div id="app" class="container mx-auto py-10">
    <div>
      <CytoForm v-model="formData" @submit="submitForm">
        <CytoFormInput
          type="email"
          name="email"
          v-model="inputField"
          placeholder="Username"
          label="Username"
          validation="email | required"
          :live="true"
        />
        <CytoFormInput
          type="select"
          options=",First, Second, Third, Fourth"
          name="year"
          v-model="selectField"
          placeholder="Year"
          label="Year"
          validation="required"
          :live="false"
        />
      </CytoForm>
      {{formData}}
    </div>
  </div>
</template>

<script >
  import Vue from "vue";
  import CytoFormInput from "./components/CustomInput.vue";
  import CytoForm from "./components/CustomForm.vue";
  export default Vue.extend({
    name: "App",
    components: {
      CytoFormInput,
      CytoForm
    },
    data() {
      return {
        inputField: "",
        selectField: "",
        formData: {}
      };
    },
    methods: {
      submitForm(data) {
        console.log(data);
      }
    }
  });
</script>

<style src="./theme/main.css">
</style>
