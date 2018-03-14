<template>
<body>
    <v-parallax src="https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c58c392d4e9f7dd63cd99ce3327b32a7&auto=format&fit=crop&w=1950&q=80" alt="FirePencil Homepage Background" height="885">
      <v-container grid-list-md>
        <v-layout
            row
            wrap
            column
            align-center
            justify-center
            class="white--text"
          >
            <v-icon class="lrgIcon">gesture</v-icon>
            <h1 class="white--text mb-2 text-xs-center">Welcome to FirePencil</h1>
            <div class="subheading mb-3 text-xs-center">
              <h2>
                "The most overpowered todo list on the planet!"
              </h2>
            </div>
            <v-btn
              class="primary white--text lighten-2 mt-3 mb-5"
              dark
              large
              router 
              :to="'/todos'"
            >
              My Todos
            </v-btn>
          </v-layout>
      </v-container>
          
        </v-parallax>
</body>  
</template>

<script>
  export default {
    computed: {
      userSignedIn(){
        return this.$store.state.user
      }
    }
  }
</script>

<style scoped>

.lrgIcon{
  margin-top: 100px;
  font-size: 10em;
  color:#fdbb2d;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.3),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

h1 {
  margin: inherit;
  font-size: 800%;
  font-family: 'Shadows Into Light', cursive;
  text-shadow: 0px 4px 3px rgba(0,0,0,0.2),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

.subheading {
  color: rgb(250, 245, 245);
  text-shadow: 0px 2px 1px rgba(0,0,0,0.2),
				       0px 8px 13px rgba(0,0,0,0.1),
				       0px 18px 23px rgba(0,0,0,0.1);
}

</style>
