<template>
    <div class="container">
        <div>
            <b-form-group
                id="input-group-number"
                label-cols-sm="1"
                :label="getNumber"
                label-for="number"
            >
                <b-form-input 
                    type="text"
                    placeholder="step"
                    v-model="$v.form.step.$model"
                    :state="validateState('step')"
                    @change="updateStep"
                ></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.step.required">
                Instruction is required
                </b-form-invalid-feedback>
            </b-form-group>
        </div>
    </div>
</template>

<script>
import { get } from "http";
import {
  required,
  alpha,
  numeric,
} from "vuelidate/lib/validators";

export default {
  name: "Instructions",
    props: {
    instruction: {
      type: Object,
      required: true,
    },    
  },
  data() {
    return {
      form: {
        number: "",
        step: "",
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      number: {
        required,
        alpha
      },
      step: {
        required,
      },
    }
  },
  computed:{
    getNumber(){
        return this.instruction.number +".";
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    updateNumber(){
        this.instruction.number = this.$v.form.number.$model;
    },
    updateStep(){
        this.instruction.step = this.$v.form.step.$model;
    },
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>