<template>
  <div>
    <br>
    <b-card no-body class="overflow-hidden card-colors" style="max-width: 540px;" align="center">
      <b-row>
        <b-col md="12">
          <b-card-body>
            <b-card-title class="text-center font-weight-bolder">About Us <b-icon-emoji-smile></b-icon-emoji-smile>
            </b-card-title>
            <hr>
            <b-container class="bv-example-row">
              <div>
                We are Nitzan and Malka, students in the SISE department at Ben Gurion University.
                <br>In the past three months we have been working hard to create a few projects as part of the "Web
                Development Enviourments" course.
                <br>One of them is our Recipes Website which you are currently using,
                <br>This is a fullstack project based on Node.js server side and Vue.js client side.
              </div>
            </b-container>
          </b-card-body>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-card-body>
            <b-container class="bv-example-row">
              <div>
                We would like to share with you our projects:
                <ul style="list-style-type:none">
                  <li><a
                      href="https://web-development-environments-2022.github.io/assignment2-208308304_209202803/">Pacman
                      Game</a></li>
                  <li><a href="https://web-development-environments-2022.github.io/208308304/">Nitzan's grandmother
                      website</a></li>
                  <li><a href="https://web-development-environments-2022.github.io/209202803/">Malka's grandmother
                      website</a></li>
                </ul>
              </div>
            </b-container>
          </b-card-body>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card-text class="text-center font-weight-bold">
            Nitzan Hen
          </b-card-text>
          <a class="icon-link" href="https://github.com/nitzanhen1">
            <b-icon-github font-scale="2" class="social-icons"></b-icon-github>
          </a>
          <a class="icon-link" href="https://linkedin.com/in/nitzan-hen-33a41a218">
            <b-icon-linkedin font-scale="2" class="social-icons"></b-icon-linkedin>
          </a>
        </b-col>
        <b-col md="6">
          <b-card-text class="text-center font-weight-bold">
            Malka Hanimov
          </b-card-text>
          <a class="icon-link" href="https://github.com/malkahan7">
            <b-icon-github font-scale="2" class="social-icons"></b-icon-github>
          </a>
          <a class="icon-link" href="https://linkedin.com/in/malka-hanimov-2a42b3217/">
            <b-icon-linkedin font-scale="2" class="social-icons"></b-icon-linkedin>
          </a>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "AboutPage"
}
</script>

<style lang="scss">
.card-colors {
  color: #C26E32;
  background-color: #FFEBCC;
  margin: 0 auto;
  float: none;
  margin-bottom: 10px;
  font-size: 18px;
  box-shadow: 5px 5px 5px 5px;
}

.social-icons {
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
}


.social-icons:hover {
  opacity: 0.85;
}

.icon-link {
  color: #C26E32 !important;
  text-decoration: underline !important;
}
</style>