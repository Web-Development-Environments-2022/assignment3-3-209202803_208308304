<template>
  <div class="container">
    <div>
      <b-input-group class="big-2">
        <b-form-input type="text" placeholder="name" v-model="$v.form.name.$model" :state="validateState('name')"
          @change="updateName"></b-form-input>
        <b-form-input type="text" placeholder="amount" v-model="$v.form.amount.$model" :state="validateState('amount')"
          @change="updateAmount"></b-form-input>
        <b-form-select v-model="metric_selected" :options="metric_options" @change="updateMetric"></b-form-select>
        <b-form-invalid-feedback v-if="!$v.form.name.required">
          Name is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.name.alphaAndSpaceValidator">
          Name can include only alphanumeric letters and spaces
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.amount.required">
          Amount is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.amount.numeric">
          Amount can include only numeric characters
        </b-form-invalid-feedback>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import {
  required,
  alpha,
  numeric,
  helpers
} from "vuelidate/lib/validators";
const alphaAndSpaceValidator = helpers.regex('alphaNumSpace', /^[a-zA-Z\-\s]+$/);

export default {
  name: "Ingredients",
  props: {
    ingredient: {
      type: Object,
      required: true,
    },

  },
  data() {
    return {
      form: {
        name: "",
        amount: "",
      },
      metric_selected: null,
      metric_options: [
        { text: 'metric', value: null, disabled: true },
        { text: 'grams', value: 'grams' },
        { text: 'ml', value: 'ml' },
        { text: 'units', value: '' },
        { text: 'cups', value: 'cups' },
        { text: 'tablespoon', value: 'tablespoon' },
        { text: 'teaspoon', value: 'teaspoon' },
        { text: 'pinch', value: 'pinch' },

      ],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      name: {
        required,
        alphaAndSpaceValidator
      },
      amount: {
        required,
        numeric
      },
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    updateName() {
      this.ingredient.name = this.$v.form.name.$model;
    },
    updateAmount() {
      this.ingredient.amount = parseInt(this.$v.form.amount.$model);
    },
    updateMetric() {
      this.ingredient.metric = this.metric_selected;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>