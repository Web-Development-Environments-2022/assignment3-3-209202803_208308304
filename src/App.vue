<template>
  <div id="app">
    <b-navbar id="navbar" type="dark">
      <b-navbar-brand href="#">Recipes</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link :to="{ name: 'main' }" class="nav-link">Main</router-link>
          <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
        </b-navbar-nav>
        <b-navbar-nav>
          <span v-if="!$root.store.username">
            <b-navbar-nav>
              <router-link :to="{ name: 'register' }" class="nav-link">Register</router-link>
              <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
            </b-navbar-nav>
          </span>
          <span v-else>
            <b-navbar-nav>
              <b-nav-item-dropdown text="Personal" class="nav-link" id="dropdown">
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
              <router-link :to="{ name: 'addRecipe' }" id="modal-link" class="nav-link">Add Recipe</router-link>
              <b-nav-item @click="Logout" class="nav-link">Logout</b-nav-item>
            </b-navbar-nav>
          </span>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>
          <b-button size="sm">
            <router-link :to="{ name: 'search' }" class="nav-link">Search</router-link>
          </b-button>
          <span v-if="!$root.store.username">
            <!-- <p>Hello Guest</p> (to make it no part of b-nav-item style)-->
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
          this.$root.store.server_domain + "/auth/logout", {}, { withCredentials: true }
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
  background-color: #AFBED5;

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

  //we can control from here on object globaly
}

#navbar {
  // position: sticky;
  color: #568A9F;
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
</style>