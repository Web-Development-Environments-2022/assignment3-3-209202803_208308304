<template>
  <div class="container">
    <h1 class="title">Favorite Recipes:</h1>
    <h3 v-if=!favorite_recipes.length>You haven't liked any recipes yet</h3>
    <RecipePreviewList title="" class="FavoriteRecipes center" :recipes="favorite_recipes.slice(0, 3)" />
    <RecipePreviewList v-for="i in row_num" :key="i" title="" class="FavoriteRecipes center"
      :recipes="favorite_recipes.slice(i * 3, i * 3 + 3)" />
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
      row_num: 1,
    };
  },

  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/favorites",
        { withCredentials: true }
      );

      this.favorite_recipes = response.data;
      this.row_num = Math.ceil(this.favorite_recipes.length / 3);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.FavoriteRecipes {
  margin: 10px 0 10px;
}
</style>