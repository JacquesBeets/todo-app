<template>
  <v-app>
    <v-navigation-drawer
    temporary 
    absolute
    v-model="sideNav"
    class="hidden-md-and-up">
      <v-list>
        <v-list-tile v-for="menuItem in menuItems" :key="menuItem.name">
          <v-list-tile-action>
            <v-icon>{{menuItem.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{menuItem.name}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
      @click.native.stop="sideNav = !sideNav"
      class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Fire Pencil</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="menuItem in menuItems" :key="menuItem.name">
          <v-icon left small>{{menuItem.icon}}</v-icon>
          {{menuItem.name}}
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>

    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
        {name: 'Todos', icon: 'thumb_up'},
        {name: 'About', icon: 'thumb_up'},
        {name: 'Register', icon: 'thumb_up'},
        {name: 'Sign In', icon: 'thumb_up'},
        {name: 'Profile', icon: 'thumb_up'}
      ]
    }
  },
  name: 'App'
}
</script>
