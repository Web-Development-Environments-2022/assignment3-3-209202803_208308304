<template>
  <div class="container">
    <h1 class="title">My Recipes:</h1>
    <h3 v-if=!my_recipes.length>You haven't posted any personal recipes yet</h3>
    <RecipePreviewList title="" class="MyRecipes center" :recipes="my_recipes.slice(0, 3)" />
    <RecipePreviewList v-for="i in row_num" :key="i" title="" class="MyRecipes center"
      :recipes="my_recipes.slice(i * 3, i * 3 + 3)" />
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
      row_num: 1,
    };
  },

  async created() {
    try {
      const response = await this.axios.get(
        this.$root.store.server_domain + "/users/myrecipes",
        { withCredentials: true }
      );

      this.my_recipes = response.data;
      let addCards = this.my_recipes.length % 3;
      this.row_num = Math.ceil(this.my_recipes.length / 3);
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