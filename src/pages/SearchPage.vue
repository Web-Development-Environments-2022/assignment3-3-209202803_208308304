<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <nav class="navbar navbar-light bg-light">
      <form class="form-inline" v-on:submit="getSearchRecipes">
        <input v-model= search_query id="search_query" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <b-dropdown no-caret id="filter-btn" text="Filter By:" class="m-2" >
        <b-dropdown-item-button @click="noFilters" class="dropdown-group">
          No Filters
        </b-dropdown-item-button>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Cuisine">
          <template>
            <div>
                <b-form-checkbox-group
                  id="checkbox-group-1"
                  v-model="cuisine_selected"
                  :options="cuisine_options"
                  name="cuisine-group"
                ></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Diet">
          <template>
            <div>
                <b-form-checkbox-group
                  id="checkbox-group-2"
                  v-model="diet_selected"
                  :options="diet_options"
                  name="diet-group"
                ></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Intolerances">
          <template>
            <div>
                <b-form-checkbox-group
                  id="checkbox-group-3"
                  v-model="intolerances_selected"
                  :options="intolerances_options"
                  name="intolerances-group"
                ></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
      </b-dropdown>
      <b-form-radio-group
        v-model="result_num_selected"
        :options="result_num_options"
        class="mb-3"
        value-field="item"
        text-field="name"
        disabled-field="notEnabled"
      ></b-form-radio-group>
    </nav>
  <p v-if="no_result"> sorry, no result match came back</p>
  <RecipePreviewList title="Results:" class="SearchResult center"  :recipes="search_result.slice(0, 3)"/>
  <RecipePreviewList v-for="i in row_num" :key="i"  title="" class="SearchResult center"  :recipes="search_result.slice(i*3, i*3+3)"/>
  <!-- <RecipePreviewList title="" class="SearchResult center"  :recipes="search_result.slice(5, 10)"/>
  <RecipePreviewList title="" class="SearchResult center"  :recipes="search_result.slice(10, 15)"/> -->
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
      search_query:"",
      search_result: [],
      no_result: false,
      row_num: 1,
      result_num_selected: '5',
      result_num_options: [
        { item: '5', name: '5' },
        { item: '10', name: '10' },
        { item: '15', name: '15' }
        ],
      cuisine_selected: [],
      cuisine_options: [
        { text: 'African', value: 'African' },
        { text: 'American', value: 'American' },
        { text: 'British', value: 'British' },
        { text: 'Cajun', value: 'Cajun' },
        { text: 'Caribbean', value: 'Caribbean' },
        { text: 'Chinese', value: 'Chinese' },
        { text: 'EasternEuropean', value: 'EasternEuropean' },
        { text: 'European', value: 'European' },
        { text: 'French', value: 'French' },
        { text: 'German', value: 'German' },
        { text: 'Greek', value: 'Greek' },
        { text: 'Indian', value: 'Indian' },
        { text: 'Irish', value: 'Irish' },
        { text: 'Italian', value: 'Italian' },
        { text: 'Japanese', value: 'Japanese' },
        { text: 'Jewish', value: 'Jewish' },
        { text: 'Korean', value: 'Korean' },
        { text: 'LatinAmerican', value: 'LatinAmerican' },
        { text: 'Mediterranean', value: 'Mediterranean' },
        { text: 'Mexican', value: 'Mexican' },
        { text: 'MiddleEastern', value: 'MiddleEastern' },
        { text: 'Nordic', value: 'Nordic' },
        { text: 'Southern', value: 'Southern' },
        { text: 'Spanish', value: 'Spanish' },
        { text: 'Thai', value: 'Thai' },
        { text: 'Vietnamese', value: 'Vietnamese' },
      ],
      diet_selected: [],
      diet_options: [
        { text: 'GlutenFree', value: 'GlutenFree' },
        { text: 'Ketogenic', value: 'Ketogenic' },
        { text: 'Vegetarian', value: 'Vegetarian' },
        { text: 'LactoVegetarian', value: 'LactoVegetarian' },
        { text: 'OvoVegetarian', value: 'OvoVegetarian' },
        { text: 'Vegan', value: 'Vegan' },
        { text: 'Pescetarian', value: 'Pescetarian' },
        { text: 'Paleo', value: 'Paleo' },
        { text: 'Primal', value: 'Primal' },
        { text: 'LowFODMAP', value: 'LowFODMAP' },
        { text: 'Whole30', value: 'Whole30' },
      ],
      intolerances_selected: [],
      intolerances_options: [
        { text: 'Dairy', value: 'Dairy' },
        { text: 'Egg', value: 'Egg' },
        { text: 'Gluten', value: 'Gluten' },
        { text: 'Grain', value: 'Grain' },
        { text: 'Peanut', value: 'Peanut' },
        { text: 'Seafood', value: 'Seafood' },
        { text: 'Sesame', value: 'Sesame' },
        { text: 'Shellfish', value: 'Shellfish' },
        { text: 'Soy', value: 'Soy' },
        { text: 'Sulfite', value: 'Sulfite' },
        { text: 'Tree Nut', value: 'Tree Nut' },
        { text: 'Wheat', value: 'Wheat' },
      ],
    };
  },
  methods: {
    async getSearchRecipes() {
      console.log(this.result_num_selected)
      try {
        const response = await this.axios.get(
          "http://localhost:3000/search",
          {
            params:{
              // query: search_query.value,
              query: this.search_query,
              cuisinesFilter: this.cuisine_selected.join(','),
              dietsFilter: this.diet_selected.join(','),
              intolerancesFilter: this.intolerances_selected.join(','),
              numOfResults: this.result_num_selected
            }
          }          
        );
        this.search_result = response.data;
        if(!this.search_result.length){
          this.no_result = true;
        }
        this.row_num = Math.ceil(this.search_result.length/3);
        noFilters()
      } catch (error) {
        console.log(error);
      }
    },
    noFilters(){
      this.cuisine_selected= [];
      this.diet_selected= [];
      this.intolerances_selected= [];
    }
  },
};
</script>
<style lang="scss" scoped>
// .RandomRecipes {
//   margin: 10px 0 10px;
// }
.dropdown-group{
  width: 300px
}

.dropdown-group header{
  font-size: 16px;

}
</style>