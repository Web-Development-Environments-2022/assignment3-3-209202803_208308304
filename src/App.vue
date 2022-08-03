<template>
  <div id="app">
    <b-navbar id="navbar" type="dark">
      <b-navbar-brand href="#">Recipes</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link tag="li" :to="{ name: 'main' }" class="nav-link">Main</router-link>
          <router-link tag="li" :to="{ name: 'about' }" class="nav-link">About</router-link>
          <router-link tag="li" :to="{ name: 'search' }" class="nav-link">Search</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <span v-if="$root.store.username">
            <b-navbar-nav>
              <b-nav-item-dropdown tag="li" text="Personal" class="nav-link" id="dropdown">
                <b-dropdown-item>
                  <router-link :to="{ name: 'favorites' }" class="b-dropdown-item">Favorites <b-icon-heart>
                    </b-icon-heart>
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link :to="{ name: 'myrecipes' }" class="b-dropdown-item">My Recipes</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link :to="{ name: 'familyrecipes' }" class="b-dropdown-item">Family Recipes</router-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <router-link tag="li" :to="{ name: 'addRecipe' }" id="modal-link" class="nav-link">Add Recipe</router-link>
            </b-navbar-nav>
          </span>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>

          <span v-if="!$root.store.username">
            <!-- <p>Hello Guest</p> (to make it no part of b-nav-item style)-->
            <b-navbar-nav>
              <b-nav-link tag="li" class="nav-item" id="hello-guest">Hello Guest</b-nav-link>
              <router-link tag="li" :to="{ name: 'register' }" class="nav-link">Register</router-link>
              <router-link tag="li" :to="{ name: 'login' }" class="nav-link">Login</router-link>
            </b-navbar-nav>
          </span>
          <span v-else>
            <b-navbar-nav>
              <b-nav-link class="nav-item" id="hello-user">Hello {{ $root.store.username }} </b-nav-link>
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
      if (response) {
        this.$root.toast("Logout", "User logged out successfully", "success");
        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      }
      else{
        this.$root.toast("Logout-fail", "Something went wrong with our server", "warning");
      }
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

  h1 {
    margin-top: 10px;
  }

  h3 {
    margin-top: 10px;
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

  li:hover {
    opacity: 0.75;
  }
}

#navbar {
  // position: sticky;
  // color: #568A9F;
  background-color: #568A9F;

}

#modal-link {
  margin-top: 7.5px
}
</style>
<style lang="scss" scoped>
#dropdown {
  //not working
  background-color: #568A9F;
  color: #2c3e50;
}

// .dropdown-item a{
//       opacity: 1;
// }
// .nav-item{
//         color: red !important;
//     }

// #app .nav-link a { color: red }
#hello-user {
  color: #DAC971;
  margin-top: 15px;
  font-size: 17px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: italic;
  margin-right:  5px;
}

#hello-guest{
    color: #DAC971;
  margin-top: 7.5px;
  font-size: 17px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-style: italic;
  margin-right:  5px;
}

// #hello-user :hover{
//   color: red;
// }
</style>