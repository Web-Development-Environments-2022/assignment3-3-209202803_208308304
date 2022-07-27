<template>
  <div class="container">
    <RecipePreviewList title="Favorite Recipes:" class="FavoriteRecipes center"  :recipes="favorite_recipes"/>
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
    };
  },

  created() {
    this.getFavoriteRecipes();

  },
  methods: {
    async getFavoriteRecipes() {
      try {
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/user/favorite",
          "http://localhost:3000/user/favorites",
          { withCredentials: true }
        );

        console.log(response);
        this.favorite_recipes = response.data;
        console.log(this.favorite_recipes);
      } catch (error) {
        console.log(error);
      }
    }, 
  }
};
</script>

<style lang="scss" scoped>
.FavoriteRecipes {
  margin: 10px 0 10px;
}

</style>
