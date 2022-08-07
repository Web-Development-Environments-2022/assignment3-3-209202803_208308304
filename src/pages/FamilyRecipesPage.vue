<template>
  <div class="container">
    <h1 class="title">Family Recipes:</h1>
    <h3 v-if=!family_recipes.length> {{ title }} </h3>
    <div class="familyCard" v-for="(recipe, index) in family_recipes" :key="index">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h3>{{ recipe.title }}</h3>
            <img class="center" :src="recipe.image" v-on:error="recipe.image='https://spoonacular.com/recipeImages/471334-312x231.jpg'">
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div><strong>Owner:</strong> {{ recipe.owner }}</div>
                <div><strong>Tradition:</strong> {{ recipe.tradition }}</div>
              <div><strong>Servings:</strong> {{ recipe.servings }}</div>
              <div><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</div>
              <div><strong>Likes:</strong> {{ recipe.popularity }} likes</div>
              <div v-if="recipe.vegan"><strong>Vegan</strong> <b-icon-check></b-icon-check></div>
              <div v-if="recipe.vegetarian"><strong>Vegetarian</strong> <b-icon-check></b-icon-check></div>
              <div v-if="recipe.glutenFree"><strong>Gluten Free</strong> <b-icon-check></b-icon-check></div>
              </div>
              <strong>Ingredients:</strong>
              <ul>
                <li v-for="(r, index) in recipe.ingredients" :key="index">
                  {{ r.amount }} {{ r.metric }} {{ r.name }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              <strong>Instructions:</strong>
              <ol>
                <li v-for="s in recipe.instructions" :key="s.number">
                  {{ s.step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      family_recipes: [],
      title: "",
    };
  },
  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/familyrecipes",
        { withCredentials: true }
      );

      this.family_recipes = response.data;
      if (!this.family_recipes.length) {
        this.title = "     You haven't posted any family recipes yet"
      }
    } catch (error) {
      console.log(error.response);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}

.wrapped {
  width: 50%;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.familyCard {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 10px 10px 10px;
  box-shadow: 5px 5px 5px 5px;
}

h3{
  margin: 10px;
}
</style>