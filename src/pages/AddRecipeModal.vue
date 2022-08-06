<template>
  <div class="container">
    <div>
      <!-- <b-button v-b-modal.recipe-modal>Add Recipe</b-button> -->
      <b-modal @hide="exit" class="modal" ref="recipe-modal" id="recipe-modal" hide-footer title="Add New Recipe">
        <b-form @submit.prevent="onSave" id="form">
          <b-form-group>
            Select recipe type:
            <b-form-radio-group id="btn-radios-2" v-model="type_selected" :options="type_options"
              button-variant="outline-primary" name="radio-btn-outline" buttons>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group id="input-group-title" label-cols-sm="3" label="title:" label-for="title">
            <b-form-input id="title" v-model="$v.form.title.$model" type="text" :state="validateState('title')">
            </b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.title.required">
              Title is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.title.alphaNumAndSpaceValidator">
              Title can include only alphanumeric letters and special characters .,-!?()
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-image" label-cols-sm="3" label="image:" label-for="image">
            <b-form-input id="image" v-model="$v.form.image.$model" type="url" :state="validateState('image')">
            </b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.image.url">
              Recipe Image should be in the URL format
            </b-form-invalid-feedback>
          </b-form-group>
          <div v-if="type_selected == 'family'">
            <b-form-group id="input-group-owner" label-cols-sm="3" label="recipe owner:" label-for="owner">
              <b-form-input id="owner" v-model="$v.form_family.owner.$model" type="text"
                :state="validateStateFamily('owner')">
              </b-form-input>
              <b-form-invalid-feedback v-if="!$v.form_family.owner.required">
                Recipe's owner is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form_family.owner.alpha">
                Recipe's owner can include only alphabetic characters
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-tradition" label-cols-sm="3" label="recipe tradition:" label-for="tradition">
              <b-form-textarea id="tradition" v-model="$v.form_family.tradition.$model"
                :state="validateStateFamily('tradition')" rows="2" max-rows="2"></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form_family.tradition.required">
                Recipe's tradition is required
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form_family.tradition.alphaNumAndSpaceValidator">
                Recipe's tradition can include only alphanumeric letters and special characters .,-!?()
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
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
            <b-form-checkbox-group v-model="diet_selected" :options="diet_options" switches></b-form-checkbox-group>
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
  url,
  alpha,
  helpers,
} from "vuelidate/lib/validators";
const alphaNumAndSpaceValidator = helpers.regex('alphaNumSpace', /^[\w\-\s.,!?()]+$/);
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
      form_family: {
        owner: "",
        tradition: "",
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
        alphaNumAndSpaceValidator,
      },
      image: {
        url,
      },
      readyInMinutes: {
        required,
        numeric,
      },
      servings: {
        required,
        numeric,
      },
    },
    form_family: {
      owner: {
        required,
        alpha,
      },
      tradition: {
        required,
        alphaNumAndSpaceValidator,
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
    validateStateFamily(param) {
      const { $dirty, $error } = this.$v.form_family[param];
      return $dirty ? !$error : null;
    },
    async SaveRecipe() {
      await this.getDiet();
      try {
        let body = {
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
        }
        if (this.type_selected == 'personal') {
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/myrecipes",
            body, { withCredentials: true }
          );
        }
        else {
          body["owner"] = this.form_family.owner;
          body["tradition"] = this.form_family.tradition;
          const response = await this.axios.post(
            this.$root.store.server_domain + "/users/familyrecipes",
            body, { withCredentials: true }
          );
        }
        this.$root.toast("SaveRecipe", "New recipe saved successfully", "success");
        this.goToPage();
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
    goToPage() {
      if (this.type_selected == 'personal')
        this.$router.push("/user/myrecipes");
      else {
        this.$router.push("/user/familyrecipes");
      }
    },
    exit(bvModalEvt) {

      if (confirm("Are you sure you want to exit?\nYour recipe will be lost") == true) {
        this.$router.back();
      }
      else {
        bvModalEvt.preventDefault()
      }
    }
    ,
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
      if (this.type_selected == 'family') {
        this.$v.form_family.$touch();
        if (this.$v.form_family.$anyError) {
          return;
        }
      }
      this.SaveRecipe();
    },
  },
};
</script>
<style lang="scss" >

.modal { 
  color: #568A9F;

  button {
    background-color: #568A9F ;
    border: none;
    color: white;
  }

  #btn-radios-2{
      background-color: #568A9F;
    border: none;
    color: white;
}
}


.c-modal { 
  width: 100%;
  color: #221351;
  background-color: #221351;
}


</style>
<style lang="scss" scoped>
.container {
  max-width: 900px;
  // background-color: #F7C272;
}


// #form{ working but ugly!
//   background-color: #F7C272;
//   color: #C26E32;
// }

// .modal { not working
//   width: 100%;
//   background-color: #F7C272;
//   color: #F7C272;
// }

.controls {
  width: 294px;
  margin: 15px auto;
}

#remove_fields {
  float: right;
}
</style>