<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group id="input-group-Username" label-cols-sm="3" label="Username:" label-for="Username">
        <b-form-input id="Username" v-model="$v.form.username.$model" type="text" :state="validateState('username')">
        </b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="Password">
        <b-form-input id="Password" type="password" v-model="$v.form.password.$model"
          :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-button type="submit" variant="primary" style="width:100px;display:block;" class="mx-auto w-100">Login
      </b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link :to="{ name: 'register' }"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/auth/login",
          {
            username: this.form.username,
            password: this.form.password
          },
          { withCredentials: true }
        );
        this.$root.store.login(this.form.username);
        if (this.$router.currentRoute.path != "/") {
          this.$router.push("/");
        }
        else {
          this.$emit('login')
        }
      } catch (err) {
        if (!err.response) {
          this.$root.toast("Login-fail", "Something went wrong with our server", "warning");
        }
        else {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 400px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 20px 20px 20px 20px;
  box-shadow: 2px 2px 5px 5px #6a6a6a;
}
</style>