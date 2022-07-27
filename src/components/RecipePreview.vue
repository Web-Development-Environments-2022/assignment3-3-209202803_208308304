<template>
  <router-link
    :to="{ name: 'recipe', params: { recipeId: recipe.recipe_id } }"
    class="recipe-preview">
  <div class="card">
    <div class="wrapper">
    <img class="card-img-top" :src="recipe.image">
    <b-icon class="likeIcon" :icon="favorite" font-scale="2.5"></b-icon>
    <b-icon class="watchedIcon" :icon="watched" font-scale="2.5"></b-icon>
   </div>
    <div class="card-body">
      <h5 class="card-title">{{recipe.title}}</h5>
      <p class="card-text">{{ recipe.readyInMinutes }} minutes</p>
      <p class="card-text">{{ recipe.popularity }} likes</p>
      <img v-if="recipe.vegan" class="icon" src="../assets/vegan.jpeg">
      <img v-if="recipe.vegetarian" class="icon" src="../assets/vegetarian.jpeg" >
      <img v-if="recipe.glutenFree" class="icon" src="../assets/glutenfree.jpeg">
      <!-- <ul class="icons-list">
        <img scr="../assets/vegen.jpeg">
        <li v-if="recipe.vegetarian"><img scr="../assets/vegetarian.jpeg"></li>
        <li v-if="recipe.glutenFree"><img scr="../assets/glutenfree.jpeg"></li>
      </ul> -->

    </div>
  </div>
    <!-- <div class="recipe-body">
      <b-card
        :title="recipe.title" 
        :img-src="recipe.image" 
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2">
    <b-card-text>
      {{ recipe.readyInMinutes }} minutes
      <br>
      {{ recipe.popularity }} likes
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div> -->
    <!-- <div class="recipe-body">
      <img v-if="image_load" :src="recipe.image" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>{{ recipe.readyInMinutes }} minutes</li>
        <li>{{ recipe.aggregateLikes }} likes</li>
      </ul>
    </div> -->
  </router-link>
</template>

<script>
export default {
  created(){
    if(this.recipe.favorite)
      this.favorite = "heart-fill";
    if(this.recipe.watched)
      this.watched = "eye";
  },
  mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    if(this.image_load = false){
      this.axios.get("https://spoonacular.com/recipeImages/471334-312x231.jpg").then((i) => {
      this.image_load = true;
      });
    }
  },
  data() {
    return {
      image_load: false,
      favorite: "heart",
      watched: "eye-slash",
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 450px;
  position: relative;
  margin: 10px 10px;
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
  width: 100%;
  height: 100%;
  position: relative;
}

.card :hover{
    text-decoration: none;
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
  padding-left: 8px;
  padding-bottom: 10px;
  width : 30%;
  position: absolute;
  bottom: 0px;
}
/* .recipe-preview .recipe-body b-card img{
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: 200px;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .card-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
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
} */
</style>