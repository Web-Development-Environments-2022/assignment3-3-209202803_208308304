<template>
  <div class="container">
    <RecipePreviewList title="Favorite Recipes:" class="FavoriteRecipes center"  :recipes="favorite_recipes.slice(0, 3)"/>
    <RecipePreviewList v-for="i in row_num" :key="i"  title="" class="FavoriteRecipes center"  :recipes="favorite_recipes.slice(i*3, i*3+3)"/>
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
      row_num : 1,
    };
  },

  async created() {
      try {
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/users/favorite",
          "http://localhost:3000/users/favorites",
          { withCredentials: true }
        );

        this.favorite_recipes = response.data;
        // let addCards = this.favorite_recipes.length%3;
        // for(let i =0; i<addCards; i++)
        // this.favorite_recipes.push({});
        this.row_num = Math.ceil(this.favorite_recipes.length/3);
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
