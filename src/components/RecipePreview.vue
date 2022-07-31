<template>
  <div class="card">
    <div class="wrapper">
      <div v-if="image_load">
            <img @click="viewRecipe" class="card-img-top" :src="recipe.image">
      </div>
      <div v-else>
        <img @click="viewRecipe" class="card-img-top" src="../assets/default_recipe_image.jpg">
      </div>
      <b-icon @click="addToFavorite" class="likeIcon" variant="info" :icon="favorite" font-scale="2.5" :animation="likeAnima"></b-icon>
      <b-icon class="watchedIcon" variant="info" :icon="watched" font-scale="2.5"></b-icon>
   </div>
      <div class="card-body" @click="viewRecipe">
        <h5 class="card-title">{{recipe.title}}</h5>
        <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>
        <p class="card-text">{{ recipe.popularity }} likes</p>
        </div>
    <div>
        <b-row>
          <b-col>
          <img  v-if="recipe.vegan" class="icon" src="../assets/vegan.jpeg">
          </b-col>
          <b-col>
          <img v-if="recipe.vegetarian" class="icon" src="../assets/vegetarian.jpeg">
          </b-col>
          <b-col>
          <img v-if="recipe.glutenFree" class="icon" src="../assets/glutenfree.jpeg">
          </b-col>
        </b-row>
    </div>
  </div>
</template>

<script>
export default {
  created(){
    if(this.recipe.isFavorite)
      this.favorite = "heart-fill";
    if(this.recipe.isWatched)
      this.watched = "eye-fill";
  },
  mounted() {
    try{
      if(this.recipe.image){
      this.axios.get(this.recipe.image).then((i) => {
        this.image_load = true;
      },() => {});}
    }catch(err){}//not helping 
    
  },

  data() {
    return {
      image_load: false,
      favorite: "heart",
      watched: "eye-slash",
      likeAnima: "",
      image_src:"../assets/default_recipe_image.jpg"
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async addToFavorite(){
      if(!this.recipe.isFavorite){
        try{
          const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/recipes/info",
          //this.$root.store.server_domain + "/recipes/info",
          `http://localhost:3000/users/favorites`,
          {recipe_id: this.recipe.recipe_id},
          { withCredentials: true }
        );
        this.favorite = "heart-fill";
        this.likeAnima = "throb";
        setTimeout(() => {
          this.likeAnima = "";
        }, 1500);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
      }
    },
    viewRecipe(){
         this.$router.push({ name: 'recipe',params: { recipeId: this.recipe.recipe_id } });
    },
  }
};
</script>

<style scoped>
.recipe-preview {
  display:inline-block;
  width: 100%;
  height: 380px;
  position: relative;
  margin: 5px 5px;

}

.wrapper {
    position:relative
}
.likeIcon {
   position:absolute;
   top:0;
   right:0;
}
.watchedIcon {
   position:absolute;
   top:50px;
   right:0;
}
.card {
  width: 280px;
  height: 380px;
  position: relative;
  margin: 10px 10px;
}
.card .card-body :hover{
  color: rgb(37, 16, 157);
  font-style: bold;
  opacity: 0.3;
}
.card-img-top{
  height: 185px;
}
.wrapper:hover .card-img-top{
    opacity: 0.3;

}
.card .card-title {
  padding: 2px 2px;
  width: 100%;
  font-size: 14pt;
  text-align: left;
  white-space: nowrap;
 white-space: initial;
   /*overflow:visible;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis; */
}

.card .card-text {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}

.icon{
  padding-bottom: 10px;
  width : 100%;
  bottom: 0px;
}

</style>