<template>
    <div class="container">
        <div>
            <b-input-group class="big-2">
                <b-form-input 
                type="text"
                placeholder="name"
                v-model="$v.form.name.$model"
                :state="validateState('name')"
                @change="updateName"
                ></b-form-input>
                <b-form-input 
                type="text" 
                placeholder="amount"
                v-model="$v.form.amount.$model"
                :state="validateState('amount')"
                @change="updateAmount"
                ></b-form-input>
                <b-form-select
                    v-model="metric_selected"
                    :options="metric_options"
                    @change="updateMetric"
                    required
                ></b-form-select>
                <b-form-invalid-feedback v-if="!$v.form.name.required">
                Name is required
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.name.alpha">
                Name can include only alphabetic letters
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
} from "vuelidate/lib/validators";

export default {
  name: "Ingredients",
    props: {
    ingredient: {
      type: Object,
      required: true,
        // name: {
        // type: String,
        //   required: true
        // },
        // amount: {
        // type:String,
        //   required: true
        // },
        // metric: {
        // type:String,
        //   required: true,
        // default: null
        // },
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
        { text: 'metric', value: null, disabled: true},
        { text: 'grams', value: 'grams'},
        { text: 'ml', value: 'ml'},
        { text: 'units', value: ''},
        { text: 'cups', value: 'cups' },
        { text: 'tablespoon', value: 'tablespoon' },
        { text: 'teaspoon', value: 'teaspoon'},
        { text: 'pinch', value: 'pinch'},
        
      ],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      name: {
        required,
        alpha
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
    updateName(){
        this.ingredient.name = this.$v.form.name.$model;
    },
    updateAmount(){
        this.ingredient.amount = parseInt(this.$v.form.amount.$model);
    },
    updateMetric(){
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