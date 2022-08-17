<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <div class="wrapper-img">
          <img class="center" :src="recipe.image"
            v-on:error="recipe.image = 'https://spoonacular.com/recipeImages/471334-312x231.jpg'">
          <b-icon @click="addToFavorite" class="likeIcon" :icon="favorite" font-scale="3" :animation="likeAnima">
          </b-icon>
          <b-icon class="watchedIcon" :icon="watched" font-scale="3"></b-icon>
        </div>
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div><strong>Servings:</strong> {{ recipe.servings }}</div>
              <div><strong>Ready in:</strong> {{ recipe.readyInMinutes }} minutes</div>
              <div><strong>Likes:</strong> {{ recipe.popularity }} likes</div>
              <div v-if="recipe.vegan"><strong>Vegan</strong>
                <b-icon-check></b-icon-check>
              </div>
              <div v-if="recipe.vegetarian"><strong>Vegetarian</strong>
                <b-icon-check></b-icon-check>
              </div>
              <div v-if="recipe.glutenFree"><strong>Gluten Free</strong>
                <b-icon-check></b-icon-check>
              </div>
            </div>
            <strong>Ingredients:</strong>
            <ul>
              <li v-for="(r, index) in recipe.ingredients" :key="index">
                {{ r.amount }} {{ r.metric }} {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            <strong>Instructions:</strong>
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      favorite: "star",
      watched: "eye-slash",
      likeAnima: "",
    };
  },
  async created() {
    try {
      let response;
      try {
        response = await this.axios.put(
          this.$root.store.server_domain + `/recipes/${this.$route.params.recipeId}`, {},
          { withCredentials: true }
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log(error.response);
        this.$router.replace("/NotFound");
        return;
      }
      let {
        Preview,
        servings,
        ingredients,
        instructions,
      } = response.data;

      let { recipe_id, title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, isFavorite, isWatched } = Preview;

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

    if (this.recipe.isFavorite)
      this.favorite = "star-fill";
    if (this.recipe.isWatched)
      this.watched = "eye-fill";
    if (!this.recipe.image)
      this.recipe.image = 'https://spoonacular.com/recipeImages/471334-312x231.jpg';
  },
  methods: {
    async addToFavorite() {
      if (this.$root.store.username) {
        if (this.favorite == "star"){
          try {
            const response = await this.axios.post(
              this.$root.store.server_domain + "/users/favorites",
              { recipe_id: this.recipe.recipe_id },
              { withCredentials: true }
            );
            this.favorite = "star-fill";
            this.likeAnima = "throb";
            setTimeout(() => {
              this.likeAnima = "";
            }, 1500);
          } catch (err) {
            console.log(err.response);
          }
        }
      }
      else {
        this.$root.toast("Not Logged In", "You have to be logged in to like recipes", "error");
      }
    },
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #F7C272;
  padding: 10px 10px 10px 10px;
  box-shadow: 5px 5px 5px 5px;

}

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

.wrapper-img {
  position: relative
}

.likeIcon {
  position: absolute;
  top: 0;
  right: 0;
  color: #568A9F;
  cursor: pointer;
}

.watchedIcon {
  position: absolute;
  top: 60px;
  right: 0;
  color: #568A9F;

}
</style>