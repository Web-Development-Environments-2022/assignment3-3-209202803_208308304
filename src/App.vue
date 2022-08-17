<template>
  <div id="app">
    <b-navbar id="navbar" type="dark">
      <b-navbar-brand>
        <img id="logo" src="./assets/logo.png" alt="recipes" style="width:3em; height:auto;">
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item tag="li" :to="{ name: 'main' }" class="nav-link">Main</b-nav-item>
          <b-nav-item tag="li" :to="{ name: 'about' }" class="nav-link">About</b-nav-item>
          <b-nav-item tag="li" :to="{ name: 'search' }" class="nav-link">Search</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav>
          <span v-if="$root.store.username">
            <b-navbar-nav>
              <b-nav-item-dropdown text="Personal" id="dropdown" class="m-2">
                  <b-dropdown-item :to="{ name: 'favorites' }" >Favorites <b-icon-star></b-icon-star></b-dropdown-item>
                <b-dropdown-item :to="{ name: 'myrecipes' }" class="b-dropdown-item">My Recipes
                </b-dropdown-item>
                <b-dropdown-item :to="{ name: 'familyrecipes' }" class="b-dropdown-item">Family Recipes
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item tag="li" :to="{ name: 'addRecipe' }" id="modal-link" class="nav-link">Add Recipe</b-nav-item>
            </b-navbar-nav>
          </span>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>

          <span v-if="!$root.store.username">
            <b-navbar-nav>
              <b-nav-text tag="li" class="nav-item" id="hello-guest">Hello Guest</b-nav-text>
              <b-nav-item tag="li" :to="{ name: 'register' }" class="nav-link">Register</b-nav-item>
              <b-nav-item tag="li" :to="{ name: 'login' }" class="nav-link">Login</b-nav-item>
            </b-navbar-nav>
          </span>
          <span v-else>
            <b-navbar-nav>
              <b-nav-text class="nav-item" id="hello-user">Hello {{ $root.store.username }} </b-nav-text>
              <b-nav-item @click="Logout" class="nav-link">Logout</b-nav-item>
            </b-navbar-nav>
          </span>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    async Logout() {
      const response = await this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

html {
  background-color: #AFBED5;
  background-size: cover contain;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #AFBED5;
  background-size: cover contain;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  h1 {
    margin-top: 10px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }

  h3 {
    margin-top: 10px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }

  button {
    background-color: #568A9F;
    border: none;
    color: white;
  }

  .nav-link {
    color: white;

 }

  .nav-link :hover {
    opacity: 0.85;
  }



  #dropdown{
    opacity: 1;
    // margin-top: 17px;
  }

  #dropdown:hover{
    opacity: 1;
  }

  .dropdown-item{
    color: #568A9F;
  }
}

#navbar {
  background-color: #568A9F;
  font-size: 18px;

}


</style>

<style lang="scss" scoped>
  li:hover {
    opacity: 0.75;
  }

#dropdown {
  background-color: #568A9F;
  color: #2c3e50;
}

#hello-user {
  color: #DAC971;
  margin-top: 8px;
  font-size: 18px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: italic;
  margin-right:  10px;
}

#hello-guest{
  color: #DAC971;
  margin-top: 8px;
  font-size: 18px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: italic;
  margin-right: 10px;
}

#hello-user:hover{
    opacity: 1;
}

#hello-guest:hover{
    opacity: 1;
}
</style>