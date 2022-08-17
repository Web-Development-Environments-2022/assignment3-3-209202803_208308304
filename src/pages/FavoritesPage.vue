<template>
  <div class="container">
    <h1 class="title">Favorite Recipes:</h1>
    <RecipePreviewList :title="title" class="FavoriteRecipes center" :recipes="favorite_recipes" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "FavoritesPage",
  components: {
    RecipePreviewList
  },

  data() {
    return {
      favorite_recipes: [],
      title: "",
    };
  },

  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorites",
        { withCredentials: true }
      );
      this.favorite_recipes = response.data;
      if (!this.favorite_recipes.length) {
        this.title = "You haven't liked any recipes yet"
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
</script>

<style lang="scss" scoped>
.FavoriteRecipes {
  margin: 10px 0 10px;
}
</style>