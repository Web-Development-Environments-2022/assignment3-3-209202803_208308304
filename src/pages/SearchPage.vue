<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline" v-on:submit="getSearchRecipes">
        <input id="search_query" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <b-form-radio-group
        v-model="selected"
        :options="options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
      ></b-form-radio-group>
    </nav>
  <RecipePreviewList title="Results:" class="SearchResult center"  :recipes="search_result.slice(0, 5)"/>
  <RecipePreviewList title="" class="SearchResult center"  :recipes="search_result.slice(5, 10)"/>
  <RecipePreviewList title="" class="SearchResult center"  :recipes="search_result.slice(10, 15)"/>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  name: "SearchPage",
  components: {
    RecipePreviewList
  },

  data() {
    return {
      search_result: [],
      selected: '5',
        options: [
          { item: '5', name: '5' },
          { item: '10', name: '10' },
          { item: '15', name: '15' }
          ]
    };
  },
  methods: {
    async getSearchRecipes() {
      console.log(this.selected)
      try {
        const response = await this.axios.get(
          "http://localhost:3000/search",
          {
            params:{
              query: search_query.value,
              numOfResults: this.selected
            }
          }          
        );
        console.log(response);
        this.search_result = response.data;
        console.log(this.search_result);
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
        selectPosFilter(){
            if (this.selected){
                this.$emit('filter-results', 'position_num', this.selected);
            }
            return true

        }
    }
};
</script>
<style lang="scss" scoped>
// .RandomRecipes {
//   margin: 10px 0 10px;
// }
</style>