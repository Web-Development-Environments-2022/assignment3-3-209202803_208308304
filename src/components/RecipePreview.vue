<template>
  <div class="card">
    <div class="wrapper">
      <a href="#"><img @click="viewRecipe" class="card-img-top" :src="recipe.image" v-on:error="recipe.image='https://spoonacular.com/recipeImages/471334-312x231.jpg'"></a>
      <b-icon @click="addToFavorite" class="likeIcon" :icon="favorite" font-scale="2.2" :animation="likeAnima"></b-icon>
      <b-icon class="watchedIcon" :icon="watched" font-scale="2.2"></b-icon>
    </div>
    <div href="#" class="card-body" @click="viewRecipe">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <ul >
        <li class="card-text">{{ recipe.readyInMinutes }} minutes</li>
        <li class="card-text"> | </li>
        <li class="card-text">{{ recipe.popularity }} likes</li>
     </ul>
    </div>
    <div>
      <b-row>
        <b-col>
          <img v-if="recipe.vegan" class="icon" src="../assets/vegan.png">
        </b-col>
        <b-col>
          <img v-if="recipe.vegetarian" class="icon" src="../assets/vegetarian.png">
        </b-col>
        <b-col>
          <img v-if="recipe.glutenFree" class="icon" style="width:76%; margin-top:5px" src="../assets/glutenfree.png">
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (this.recipe.isFavorite)
      this.favorite = "star-fill";
    if (this.recipe.isWatched)
      this.watched = "eye-fill";
    if(!this.recipe.image)
      this.recipe.image = 'https://spoonacular.com/recipeImages/471334-312x231.jpg';
  },
  data() {
    return {
      favorite: "star",
      watched: "eye-slash",
      likeAnima: "",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addToFavorite() {
      if(this.$root.store.username){
        if (!this.recipe.isFavorite) {
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
            console.log("Response status: " + err.response.status);
          }
        }
      }
      else{
        this.$root.toast("Not Logged In", "You have to be logged in to like recipes", "error");
      }
    },
    viewRecipe() {
      this.$router.push({ name: 'recipe', params: { recipeId: this.recipe.recipe_id } });
    }
  }
};
</script>

<style scoped>

.wrapper {
  position: relative
}

.likeIcon {
  position: absolute;
  top: 0;
  right: 0;
  color: #568A9F;
  background-color: #F7C272;
}

.watchedIcon {
  position: absolute;
  top: 35px;
  right: 0;
  color: #568A9F;
  background-color: #F7C272;
}

.card {
  width: 300px;
  height: 400px;
  position: relative;
  margin: 10px 0px;
  background-color: #F7C272;
  box-shadow: 2px 2px 2px 2px #6a6a6a;
}

.card .card-body :hover {
  color: #C26E32;
  font-style: bold;
}

.card-img-top {
  height: 185px;
}

.wrapper:hover .card-img-top {
  opacity: 0.7;

}

.card .card-title {
  padding: 2px 2px;
  width: 100%;
  font-size: 14pt;
  text-align: left;
  height: 65px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1; 
  display: inline;
  text-align: left;
  align-items: left;
  letter-spacing: 0.5px;
  word-spacing: 3px;

}

ul { list-style: none outside none; margin:0; padding: 0; }
li { float: left; margin: 0 10px; }

.icon {
  margin-bottom: 5px;
  width: 100%; 
  bottom: 0px;
}

</style>