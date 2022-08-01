<template>
  <div class="container">
    <div>
      <!-- <b-button v-b-modal.recipe-modal>Add Recipe</b-button> -->
      <b-modal @hidden="backToMain" ref="recipe-modal" id="recipe-modal" hide-footer title="Add New Recipe">
        <b-form @submit.prevent="onSave" @reset.prevent="onReset">
          <b-form-group>
            Select recipe type:
            <b-form-radio-group id="btn-radios-2" v-model="type_selected" :options="type_options"
              :aria-describedby="ariaDescribedby" button-variant="outline-primary" name="radio-btn-outline" buttons>
            </b-form-radio-group>
          </b-form-group>

          <b-form-group id="input-group-title" label-cols-sm="3" label="title:" label-for="title">
            <b-form-input id="title" v-model="$v.form.title.$model" type="text" :state="validateState('title')">
            </b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.title.required">
              Title is required
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-image" label-cols-sm="3" label="image:" label-for="image">
            <b-form-input id="image" v-model="$v.form.image.$model" type="url" :state="validateState('image')">
            </b-form-input>
            <!-- <b-form-invalid-feedback v-if="!$v.form.image.required">
                  Recipe Image is required
                </b-form-invalid-feedback> -->
            <b-form-invalid-feedback v-if="!$v.form.image.url">
              Recipe Image should be in the URL format
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-readyInMinutes" label-cols-sm="6" label="preparation time: (in minutes)"
            label-for="readyInMinutes">
            <b-form-input id="readyInMinutes" placeholder="0" v-model="$v.form.readyInMinutes.$model" type="text"
              :state="validateState('readyInMinutes')"></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.required">
              Preparation time is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.readyInMinutes.numeric">
              Preparation time can include only numeric characters
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group>
            <b-form-checkbox-group v-model="diet_selected" :options="diet_options" :aria-describedby="ariaDescribedby"
              switches></b-form-checkbox-group>
          </b-form-group>
          <b-form-group id="input-group-servings" label-cols-sm="3" label="servings:" label-for="servings">
            <b-form-input id="servings" placeholder="0" v-model="$v.form.servings.$model" type="text"
              :state="validateState('servings')"></b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.servings.required">
              Servings amount is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.servings.numeric">
              Servings amount can include only numeric characters
            </b-form-invalid-feedback>
          </b-form-group>
          <p>Ingredients:</p>
          <b-col v-for="(ing, index) in ingredients" :key="index">
            <Ingredients class="ingredients" :ingredient="ing" />
          </b-col>
          <div class="controls">
            <a id="add_more_fields" @click="add_ingredient">
              <b-icon-plus></b-icon-plus> Add Ingredient
            </a>
            <a id="remove_fields" @click="remove_ingredient">
              <b-icon-dash></b-icon-dash> Remove Ingredient
            </a>
          </div>
          <p>Instructions:</p>
          <b-col v-for="ins in instructions" :key="'A' + ins.number">
            <Instructions class="instructions" :instruction="ins" />
          </b-col>
          <div class="controls">
            <a id="add_more_fields" @click="add_instruction">
              <b-icon-plus></b-icon-plus> Add Instruction
            </a>
            <a id="remove_fields" @click="remove_instruction">
              <b-icon-dash></b-icon-dash> Remove Instruction
            </a>
          </div>
          <b-button type="submit" variant="primary">Save Recipe</b-button>
        </b-form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {
  required,
  numeric,
  url
} from "vuelidate/lib/validators";
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";

export default {
  name: "AddRecipeModal",
  components: {
    Ingredients,
    Instructions
  },
  data() {
    return {
      type_selected: 'personal',
      type_options: [
        { text: 'Personal', value: 'personal' },
        { text: 'Family', value: 'family' },
      ],
      form: {
        title: "",
        image: "",
        readyInMinutes: "",
        servings: "",
        submitError: undefined
      },
      diet_selected: [],
      diet_options: [
        { text: "Vegan", value: "vegan" },
        { text: "Vegetarian", value: "vegetarian" },
        { text: "Gluten Free", value: "glutenFree" },
      ],
      ingredients: [
        {
          name: "",
          amount: 0,
          metric: ""
        }],
      instructions_counter: 1,
      instructions: [
        {
          number: 1,
          step: "",
        }],
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      title: {
        required,
      },
      image: {
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
    }
  },
  mounted() {
    this.$bvModal.show('recipe-modal');
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async SaveRecipe() {
      await this.getDiet();
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          //this.$root.store.server_domain + "/auth/register",
          "http://localhost:3000/users/myrecipes",
          {
            title: this.form.title,
            image: this.form.image,
            readyInMinutes: parseInt(this.form.readyInMinutes),
            popularity: 0,
            vegan: this.vegan,
            vegetarian: this.vegetarian,
            glutenFree: this.glutenFree,
            ingredients: this.ingredients,
            instructions: this.instructions,
            servings: parseInt(this.form.servings),
          }, { withCredentials: true }
        );
        this.$root.toast("SaveRecipe", "New recipe saved successfully", "success");
        this.backToMain();
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    getDiet() {
      if (this.diet_selected.includes("vegan")) {
        this.vegan = true;
      }
      if (this.diet_selected.includes("vegetarian")) {
        this.vegetarian = true;
      }
      if (this.diet_selected.includes("glutenFree")) {
        this.glutenFree = true;
      }
    },
    backToMain() {
      this.$router.push("/");
    },
    add_ingredient: function () {
      this.ingredients.push(
        {
          name: "",
          amount: 0,
          metric: ""
        }
      );
    },
    remove_ingredient: function () {
      this.ingredients.pop();
    },

    add_instruction: function () {
      this.instructions_counter++;
      this.instructions.push(
        {
          number: this.instructions_counter,
          step: "",
        }
      );
    },
    remove_instruction: function () {
      this.instructions_counter--;
      this.instructions.pop();
    },
    onSave() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.SaveRecipe();
    },
    onReset() {
      this.form = {
        title: "",
        image: "",
        readyInMinutes: "",
        servings: "",
        submitError: undefined
      };
      this.diet_selected = [];
      this.ingredients = [
        {
          name: "",
          amount: 0,
          metric: ""
        }];
      this.instructions_counter = 1;
      this.instructions = [
        {
          number: 1,
          step: "",
        }];
      this.vegan = false;
      this.vegetarian = false;
      this.glutenFree = false;
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  },
};
</script>
<style lang="scss" scoped>
// .container {
//   max-width: 500px;
// }

#recipe-modal {
  width: 100%;
}

.controls {
  width: 294px;
  margin: 15px auto;
}

#remove_fields {
  float: right;
}

.controls a i.fa-minus {
  margin-right: 5px;
}

a {
  color: black;
  text-decoration: none;
}
</style>