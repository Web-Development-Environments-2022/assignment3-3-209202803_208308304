<template>
  <div class="container">
    <RecipePreviewList title="My Recipes:" class="MyRecipes center"  :recipes="my_recipes.slice(0, 3)"/>
    <RecipePreviewList v-for="i in row_num" :key="i"  title="" class="MyRecipes center"  :recipes="my_recipes.slice(i*3, i*3+3)"/>
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
      row_num : 1,
    };
  },

  async created() {
      try {
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/users/myrecipes",
          "http://localhost:3000/users/myrecipes",
          { withCredentials: true }
        );

        this.my_recipes = response.data;
        let addCards = this.my_recipes.length%3;
        // for(let i =0; i<addCards; i++)
        // this.my_recipes.push({});
        this.row_num = Math.ceil(this.my_recipes.length/3);
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
