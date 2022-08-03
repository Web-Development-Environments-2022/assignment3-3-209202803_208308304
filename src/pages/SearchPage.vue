<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <nav class="navbar navbar-light">
      <form class="form-inline" @submit.prevent="getSearchRecipes">
        <input v-model=search_query id="search_query" class="form-control mr-sm-2" type="search" placeholder="Search"
          aria-label="Search">
        <button class="btn" type="submit">Search</button>
      </form>
      <b-dropdown id="filter-btn" text="Filter By:" class="btn">
        <b-dropdown-item @click="noFilters" class="dropdown-group">
          No Filters
        </b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Cuisine">
          <template>
            <div>
              <b-form-checkbox-group id="checkbox-group-1" v-model="cuisine_selected" :options="cuisine_options"
                name="cuisine-group"></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Diet">
          <template>
            <div>
              <b-form-checkbox-group id="checkbox-group-2" v-model="diet_selected" :options="diet_options"
                name="diet-group"></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-group class="dropdown-group" header="Intolerances">
          <template>
            <div>
              <b-form-checkbox-group id="checkbox-group-3" v-model="intolerances_selected"
                :options="intolerances_options" name="intolerances-group"></b-form-checkbox-group>
            </div>
          </template>
        </b-dropdown-group>
      </b-dropdown>
      <div>
        <p>Number of results: </p>
        <b-form-radio-group v-model="result_num_selected" :options="result_num_options" class="mb-3">
        </b-form-radio-group>
      </div>
    </nav>
    <RecipePreviewList :title="title" class="SearchResult center" :recipes="search_result.slice(0, 3)" />
    <RecipePreviewList v-for="i in row_num" :key="i" title="" class="SearchResult center"
      :recipes="search_result.slice(i * 3, i * 3 + 3)" />
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
      search_query: "",
      search_result: [],
      no_result: false,
      title: "",
      row_num: 1,
      result_num_selected: '5',
      result_num_options: [
        { text: '5', value: '5' },
        { text: '10', value: '10' },
        { text: '15', value: '15' }
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
  created() {
    const storedSearch = this.$root.store.getSearchResult()
    if (storedSearch) {
      this.search_result = storedSearch;
    }
    const storedQuery = this.$root.store.getSearchQuery()
    if (storedQuery) {
      this.title = storedQuery;
    }
  },
  methods: {
    async getSearchRecipes() {
      console.log(this.result_num_selected)
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/search",
          {
            params: {
              query: this.search_query,
              cuisinesFilter: this.cuisine_selected.join(','),
              dietsFilter: this.diet_selected.join(','),
              intolerancesFilter: this.intolerances_selected.join(','),
              numOfResults: this.result_num_selected
            }
          }
        );
        this.search_result = response.data;

        if (!this.search_result.length) {
          this.no_result = true;
          this.title = "Sorry, no result match for: " + this.search_query;
        }
        else {
          this.no_result = false;
          this.title = "Results for " + this.search_query + ":"
        }
        this.$root.store.setSearchResult(this.title, this.search_result);

        this.row_num = Math.ceil(this.search_result.length / 3);
        this.noFilters()
      } catch (error) {
        console.log(error);
      }
    },
    noFilters() {
      this.cuisine_selected = [];
      this.diet_selected = [];
      this.intolerances_selected = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  //if no then return this: bg-light to the <nav class=
  background-color: #DAC971;
}

.dropdown-group {
  width: 300px
}

.dropdown-group header {
  font-size: 16px;

}
</style>