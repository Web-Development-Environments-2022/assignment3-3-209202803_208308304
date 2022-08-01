<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
      <RecipePreviewList title="Randome Recipes:" class="RandomRecipes center"  :recipes="random_recipes"/>
      <div v-if="!$root.store.username" class="float-left">
        <LoginPage @login="getWatchedRecipes"></LoginPage>
      </div>
      <div v-else>
        <RecipePreviewList title="Last Viewed Recipes:" class="RandomRecipes center"  :recipes="watched_recipes"/>
      
      </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  name: "MainPage",
  components: {
    RecipePreviewList,
    LoginPage
  },

  data() {
    return {
      random_recipes: [],
      watched_recipes: []
    };
  },

  created() {
    // this.getRandomRecipes();
    this.getWatchedRecipes();
  },
  methods: {
    async getRandomRecipes() {
      try {
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
          "http://localhost:3000/recipes/random",
          { withCredentials: true }
        );

        console.log(response);
        this.random_recipes = response.data;
        console.log(this.random_recipes);
      } catch (error) {
        console.log(error);
      }
    }, 
    async getWatchedRecipes() {
            console.log("watched")
      try {
        const response = await this.axios.get(
          //this.$root.store.server_domain + "/recipes/random",
          // "https://test-for-3-2.herokuapp.com/recipes/random"
          "http://localhost:3000/recipes/watched",
          { withCredentials: true }
        );

        console.log(response);
        this.watched_recipes = response.data;
        console.log(this.watched_recipes);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
// .left{
//   align-items: baseline;
//    left: 10px;
// }
</style>