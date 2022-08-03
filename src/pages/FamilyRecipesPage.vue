<template>
  <div class="container">
    <h1 class="title">Family Recipes:</h1>
    <h3 v-if=!family_recipes.length> {{ title }} </h3>
    <div class="familyCard" v-for="(recipe, index) in family_recipes" :key="index">
      <div v-if="recipe">
        <div class="recipe-header mt-3 mb-4">
          <h3>{{ recipe.title }}</h3>
          <div v-if="image_load">
            <img class="center" :src="recipe.image">
          </div>
          <div v-else>
            <img class="center" src="../assets/default_recipe_image.jpg">
          </div>
        </div>
        <div class="recipe-body">
          <div class="wrapper">
            <div class="wrapped">
              <div class="mb-3">
                <div>Owner: {{ recipe.owner }}</div>
                <div>Tradition: {{ recipe.tradition }}</div>
                <div>Servings: {{ recipe.servings }}</div>
                <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              </div>
              Ingredients:
              <ul>
                <li v-for="(r, index) in recipe.ingredients" :key="index">
                  {{ r.amount }} {{ r.metric }} {{ r.name }}
                </li>
              </ul>
            </div>
            <div class="wrapped">
              Instructions:
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
      image_load: false,
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
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
    }
  },
  mounted() {
    try {
      if (this.recipe.image) {
        this.axios.get(this.recipe.image).then((i) => {
          this.image_load = true;
        }, () => { });
      }
    } catch (err) { }//not helping 
  }
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
  border-style: double;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 10px 10px 10px;
}

h3{
  margin: 10px;
}
</style>