<template>
<v-parallax src="/static/firebase-background.jpg" alt="FirePencil Homepage Background" height="1000">
  <v-container class="mx-5">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <h2 class="heading">
              About FirePencil
            </h2>
            <v-spacer></v-spacer>
            <v-btn class="secondary" icon href="https://github.com/JacquesBeets/todo-app">
              <v-icon large>fa-github</v-icon>
            </v-btn>
            <v-btn class="white secondary--text" icon href="https://www.linkedin.com/in/jacques-beets">
              <v-icon medium>fa-linkedin</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-media>
            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/nZO7-DhFvJc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </v-card-media>
          <v-card-text>
            <p class="text-lg-left">
              <h4>For Users</h4>
              FirePencil is a Todo List App that enables you to save your todos and access it anywhere so you never forget anything again!
               But i'ts not only a todo list. You can create lists for anything your heart desires. For example shopping lists, packing lists, camping lists, movies to watch and anything else you can think off!
              You can access, update or change your lists from any device - PC, Phone, Tablet etc.
              View the app in action in the above video!
              <br><br>
              <h4>For Developers</h4>
              FirePencil is a Single Page CRUD Application developed with performance in mind. Even with a slow 3G connection the app remains responsive which is great for user experience. The front-end is built using Vuejs , VueRouter, Vuex and Vuetify while Authentication and Storage is handled by Firebase. 
              <br><br>
              The source code is available on GitHub by clicking on the icon above or below. You can also follow or contact me via LinkedIn.
            </p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn class="secondary" icon href="https://github.com/JacquesBeets/todo-app">
              <v-icon large>fa-github</v-icon>
            </v-btn>
            <v-btn class="white secondary--text" icon>
              <v-icon medium>fa-linkedin</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</v-parallax>
</template>

<style scoped>
  .heading{
    font-family: 'Shadows Into Light', cursive;
    font-size: 2em;
  }

  .iconBtn{
    size: 2em;
  }

  p{
    margin: 10px;
    margin-bottom: 0;
    margin-top: 0;
    padding: 30px;
    font-size: 1.2em;
    size: inherit
  }
</style>

