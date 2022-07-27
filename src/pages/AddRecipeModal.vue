<template>
  <div class="container">
    <div>
<b-button v-b-modal.recipe-modal>Add Recipe</b-button>
  <b-modal ref="recipe-modal" id="recipe-modal" hide-footer title="Add New Recipe">
    <b-form @submit.prevent="onSave" @reset.prevent="onReset">
      <b-form-group
        id="input-group-title"
        label-cols-sm="3"
        label="title:"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model="$v.form.title.$model"
          type="text"
          :state="validateState('title')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.title.required">
          Title is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.title.alpha">
          Title can include only alphabetic letters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
          id="input-group-image"
          label-cols-sm="4"
          label="image:"
          label-for="image"
        >
          <b-form-input
            id="image"
            v-model="$v.form.image.$model"
            type="url"
            :state="validateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.image.required">
            Recipe Image is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.image.url">
            Recipe Image should be in the URL format
          </b-form-invalid-feedback>
        </b-form-group>
      <b-form-group
        id="input-group-readyInMinutes"
        label-cols-sm="3"
        label="preparation time:"
        label-for="readyInMinutes"
      >
        <b-form-input
          id="readyInMinutes"
          v-model="$v.form.readyInMinutes.$model"
          type="text"
          :state="validateState('readyInMinutes')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
          Preparation time is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.numeric">
          Preparation time can include only numeric characters
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="is the recipe?"
        v-slot="{ ariaDescribedby }"
      >
      <b-form-checkbox-group
        v-model="diet_selected"
        :options="diet_options"
        :aria-describedby="ariaDescribedby"
        switches
      ></b-form-checkbox-group>
    </b-form-group>
     <b-form-group
        id="input-group-servings"
        label-cols-sm="3"
        label="servings"
        label-for="servings"
      >
        <b-form-input
          id="servings"
          v-model="$v.form.servings.$model"
          type="text"
          :state="validateState('servings')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.servings.required">
          Servings amount is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.servings.numeric">
          Servings amount can include only numeric characters
        </b-form-invalid-feedback>
      </b-form-group>

    </b-form>
    <b-button class="mt-3"  block @click="SaveRecipe">Save Recipe</b-button>
  </b-modal>
</div>
    <!-- <h1 class="title">Rsegister</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username can include only alphabetic letters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstname"
        >
          <b-form-input
            id="firstname"
            v-model="$v.form.firstname.$model"
            type="text"
            :state="validateState('firstname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">
            First name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">
          First name can include only alphabetic letters
        </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastname"
        >
          <b-form-input
            id="lastname"
            v-model="$v.form.lastname.$model"
            type="text"
            :state="validateState('lastname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">
            Last name is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
          Last name can include only alphabetic letters
        </b-form-invalid-feedback>
        </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            id="email"
            v-model="$v.form.email.$model"
            type="email"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.email.email">
            Email should be in the following format: "xxx@xxx.xxx"
          </b-form-invalid-feedback>
        </b-form-group>

      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-5 w-75"
        >Register</b-button
      >
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert> -->
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  numeric,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";

export default {
  name: "AddRecipeModal",
  data() {
    return {
      diet_selected: [],
        diet_options: [
          { text: 'Vegan', value: 'vegan' },
          { text: 'Vegetarian', value: 'vegetarian' },
          { text: 'Gluten Free', value: 'glutenFree'},
        ],
      form: {
        title: "",
        image: "",
        readyInMinutes: 0,
        servings: 0,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      title: {
        required,
        alpha
      },
      image: {
        required,
        url
      },
      readyInMinutes: {
        required,
        numeric
      },
      servings: {
        required,
        numeric
      },
      lastname: {
        required,
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      email: {
        required,
        email
      }
    }
  },
  mounted() {
    // this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    SaveRecipe() {
      this.$refs['recipe-modal'].hide()
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/auth/register",
          {
            username: this.form.username,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email
          }
        );
        this.$router.push("/auth/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>
