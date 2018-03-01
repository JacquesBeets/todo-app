<template>
<body>
    <v-parallax src="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c58c392d4e9f7dd63cd99ce3327b32a7&auto=format&fit=crop&w=1950&q=80" alt="FirePencil Homepage Background" height="885">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <v-icon class="lrgIcon">gesture</v-icon>
            <h1 class="white--text mb-2 display-3 text-xs-center">Welcome to FirePencil</h1>
            <div class="subheading mb-3 text-xs-center">
              The most overpowered todo list on the planet!
            </div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              router 
              :to="'/register'"
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
</body>  
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.lrgIcon{
  font-size: 10em;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.3),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

h1 {
  text-shadow: 0px 4px 3px rgba(0,0,0,0.2),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

.subheading {
  color: rgb(85, 85, 85);
}

</style>
