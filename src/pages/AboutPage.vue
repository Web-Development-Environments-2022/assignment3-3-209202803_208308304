<template>
   <div>
       <div>
        <div>
            <br>
            <b-card no-body class="overflow-hidden card-colors" style="max-width: 540px;" align="center">
                <b-row no-gutters>
                <b-col md="3">
                  <br>
                    <!-- <b-img class="profile-picture" src="https://res.cloudinary.com/dswkzsdoq/image/upload/v1625927482/Naor_Picture_zttpqq.jpg" rounded="circle" alt="Circle image"></b-img> -->
                    <b-card-text class="text-center font-weight-bold" >
                        Nitzan Hen
                    </b-card-text>
                    <br>
                    
                </b-col>
                <b-col md="9">
                    <b-card-body>
                        <b-card-title class="text-center font-weight-bolder">About Us <b-icon-emoji-smile></b-icon-emoji-smile></b-card-title>
                        <hr>
                        <b-container class="bv-example-row">
                          <div>
                          We are Nitzan and Malka, students in the SISE department at Ben Gurion University.
                          <br>In the past three months we have been working hard to create a few projects as part of the "Web Development Enviourments" course.
                          <br>One of them is this Recipe Website that you are using right now,
                          <br>This is a fullstack project based on Node.js server side and Vue.js client side.
                          
                          </div>
                        </b-container>
                    </b-card-body>

                </b-col>
                </b-row>
                <b-row no-gutters>
                <b-col md="3">
                    <!-- <b-img class="profile-picture" src="https://res.cloudinary.com/dswkzsdoq/image/upload/v1625929806/1613577736864_mgtkyg.jpg" rounded="circle" alt="Circle image"></b-img> -->
                    <b-card-text class="text-center font-weight-bold" >
                        Malka Hanimov
                    </b-card-text>
                    
                </b-col>
                <b-col md="9">
                    <b-card-body>
  
                        <b-container class="bv-example-row">
                          <div>
                            We would like to share with you our projects:
                            <ul>
                              <li><a href="https://web-development-environments-2022.github.io/assignment2-208308304_209202803/">Pacman Game</a></li>
                              <li><a href="https://web-development-environments-2022.github.io/208308304/">Nitzan's grandmother website</a></li>
                              <li><a href="https://web-development-environments-2022.github.io/209202803/">Malka's grandmother website</a></li>

                            </ul>        
                          </div>
                        </b-container>
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
            </div>
        </div>

    </div>   
</template>

<script>
export default {
    name: "AboutPage"
}
</script>

<style>
.card-colors {
  color: #25302B;
  background-color: #E5E5EC;
  opacity: 0.85;
  margin: 0 auto; 
  float: none; 
  margin-bottom: 10px; 


}
.profile-picture{
  width:80%;
}
</style>