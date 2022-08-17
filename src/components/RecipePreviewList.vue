<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
      <div class="float-left" v-for="r in recipes" :key="r.Preview.recipe_id">
            <RecipePreview class="recipePreview" :recipe="r.Preview" /></div>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type:Array,
      required: true
    },
  },
  data() {
    return {
      recipes_list: []
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}

.recipePreview{
  margin-right: 35px;
  margin-bottom: 20px;
}

</style>