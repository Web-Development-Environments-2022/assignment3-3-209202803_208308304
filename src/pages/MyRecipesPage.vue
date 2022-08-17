<template>
  <div class="container">
    <h1 class="title">My Recipes:</h1>
    <RecipePreviewList :title="title" class="MyRecipes center" :recipes="my_recipes" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "MyRecipesPage",
  components: {
    RecipePreviewList
  },

  data() {
    return {
      my_recipes: [],
      title: "",
    };
  },

  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/myrecipes",
        { withCredentials: true }
      );

      this.my_recipes = response.data;
      if (!this.my_recipes.length) {
        this.title = "You haven't posted any personal recipes yet"
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.MyRecipes {
  margin: 10px 0 10px;
}
</style>