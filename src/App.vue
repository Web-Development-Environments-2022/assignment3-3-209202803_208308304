<template>
<div id="app">
   <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#" >Recipes</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link :to="{ name: 'main' }" class="nav-link">Main</router-link>
        <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
      </b-navbar-nav >
      <b-navbar-nav>
      <span v-if="!$root.store.username">
      <b-navbar-nav>
        <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
        <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
       </b-navbar-nav >
      </span>
      <span v-else>
        <b-nav-item-dropdown text="Personal" class="nav-link">
        <b-dropdown-item ><router-link :to="{ name: 'favorites' }" class="b-dropdown-item">Favorites  <b-icon-heart></b-icon-heart></router-link> </b-dropdown-item> 
        <b-dropdown-item ><router-link :to="{ name: 'myrecipes' }" class="b-dropdown-item">My Recipes</router-link> </b-dropdown-item> 
        <b-dropdown-item ><router-link :to="{ name: 'familyrecipes' }" class="b-dropdown-item">Family Recipes</router-link> </b-dropdown-item> 
        </b-nav-item-dropdown>
      </span>
      <span v-if="$root.store.username">
          <b-nav-item @click="Logout" class="nav-link">Logout</b-nav-item>
      </span>
      <span v-if="$root.store.username">
        <router-link :to="{ name: 'addRecipe' }" @click="$bvModal.show('my-modal')" class="nav-link">Add Recipe</router-link>
      </span>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" right>
          <b-button size="sm"><router-link :to="{ name: 'search' }" class="nav-link">Search</router-link></b-button>
      <span v-if="!$root.store.username">
           <b-nav-item>Hello Guest</b-nav-item>
      </span>
      <span v-else>
          <b-nav-item>Hello {{ $root.store.username }}</b-nav-item>
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
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      try {
        const response = await this.axios.put(
          "http://localhost:3000/auth/logout", {}, {withCredentials: true}
        );
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

#b-navbar {
  padding: 30px;
}

#b-navbar a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-link-exact-active{
  color: #462fc9;
}

</style>