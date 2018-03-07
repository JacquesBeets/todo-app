<template>
  <v-app>
    <v-navigation-drawer
    temporary 
    absolute
    v-model="sideNav"
    class="hidden-md-and-up">
      <v-list>
        <v-list-tile 
          router 
          v-for="menuItem in menuItems" 
          :to="menuItem.link"
          :key="menuItem.name">
          <v-list-tile-action>
            <v-icon>
              {{menuItem.icon}}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{menuItem.name}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon 
      @click.native.stop="sideNav = !sideNav"
      class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer;">
        <v-icon>gesture</v-icon>
          FirePencil
        </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        flat v-for="menuItem in menuItems" 
        :key="menuItem.name"
        router 
        :to="menuItem.link">
          <v-icon left small>
          {{menuItem.icon}}
          </v-icon>
          {{menuItem.name}}
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideNav: false,
    }
  },
  computed: {
      menuItems (){
        return this.$store.state.menuItems
      }
  },
  methods: {

  }
}
</script>
