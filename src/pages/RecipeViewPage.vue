<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.popularity }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="(r, index) in recipe.ingredients"
                :key="index">
                {{ r.amount }} {{ r.metric }} {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
        response = await this.axios.put(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          //this.$root.store.server_domain + "/recipes/info",
          `http://localhost:3000/recipes/${this.$route.params.recipeId}`,
          // {
          //   params: { recipeId: this.$route.params.recipeId }
          // }
        );

        // console.log("response.status", response.status);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      console.log(response)
      let {
        Preview,
        servings,
        ingredients,
        instructions,    
      } = response.data;
      
      let {recipe_id, title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, isFavorite, isWatched } = Preview;

      let _recipe = {
        recipe_id,
        title,
        image,
        readyInMinutes,
        popularity,
        vegan,
        vegetarian,
        glutenFree,
        isFavorite,
        isWatched,
        servings,
        ingredients,
        instructions,
      };

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>