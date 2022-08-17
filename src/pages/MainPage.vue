<template>
  <div class="container">
    <h1 class="title">Main Page</h1>
    <b-row>
      <b-col class="col">
            <RecipePreviewList title="Explore This Recipes:" class="center" :recipes="random_recipes" />
            <b-button id="moreBtn" @click="getRandomRecipes">More<b-icon-shuffle></b-icon-shuffle></b-button>
      </b-col>
      <b-col class="col">
    <div v-if="!$root.store.username">
           <h3 id="blur" class="center">Last Watched Recipes:</h3> 
           <p class="center">You need to login to vue this</p>
      <LoginPage id="login" @login="getWatchedRecipes"></LoginPage>
    </div>
    <div v-else>
      <RecipePreviewList title="Last Watched Recipes:" class="center" :recipes="watched_recipes" />
    </div>
    </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  name: "MainPage",
  components: {
    RecipePreviewList,
    LoginPage,
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

.center {
  margin: 10px 10px 10px;
  padding-left: 60px;
}

.col{
    margin-top: 15px;
    margin-bottom: 20px;
    margin-right: 100px;
    box-shadow: 2px 2px 4px 4px #6a6a6a;
    background-color:rgb(216, 234, 250);
}

#moreBtn{
    margin: 10px 180px 10px;
}

#blur {
color: transparent;
   text-shadow: 0 0 5px rgba(#2c3e50,0.95);
}

#login{
  background-color: #AFBED5 !important;
}
</style>