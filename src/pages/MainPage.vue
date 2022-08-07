<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <RecipePreviewList title="Randome Recipes:" class="RandomRecipes center" :recipes="random_recipes" />
    <br>
    <br>
    <div v-if="!$root.store.username" class="float-left">
           <h3 id="blur"> Last Viewed Recipes:</h3> 
           You need to login to vue this
      <LoginPage @login="getWatchedRecipes"></LoginPage>
    </div>
    <div v-else>
      <RecipePreviewList title="Last Viewed Recipes:" class="RandomRecipes center" :recipes="watched_recipes" />
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
    this.getRandomRecipes();
    this.getWatchedRecipes();
  },
  methods: {
    async getRandomRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/random",
          { withCredentials: true }
        );
        this.random_recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getWatchedRecipes() {
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/watched",
          { withCredentials: true }
        );
        this.watched_recipes = response.data;
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

#blur {
color: transparent;
   text-shadow: 0 0 5px rgba(#2c3e50,0.95);
}
</style>