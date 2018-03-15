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
        <v-list-tile 
            v-if="userIsAuthenticated"
            router
            @click="onLogout"
            key="logout"
            to="/"
            >
          <v-list-tile-action>
            <v-icon>
              exit_to_app
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="gradient">
      <v-toolbar-side-icon 
      @click.native.stop="sideNav = !sideNav"
      class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="fontText">
        <router-link to="/" tag="span" style="cursor:pointer;">
        <v-icon class="iconColor">gesture</v-icon>
          FirePencil
        </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        flat 
        v-for="menuItem in menuItems" 
        :key="menuItem.name"
        router 
        :to="menuItem.link">
          <v-icon left small>
          {{menuItem.icon}}
          </v-icon>
          {{menuItem.name}}
          </v-btn>
          <v-btn 
          flat
          v-if="userIsAuthenticated"
          @click="onLogout"
          to="/"
          >
          <v-icon left small>
            exit_to_app
          </v-icon>
            Logout
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
        let menuItems = [
          {name: 'About', icon: 'thumb_up', link: '/about'},
          {name: 'Register', icon: 'create', link: '/register'},
          {name: 'Sign In', icon: 'vpn_key', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {name: 'Todos', icon: 'done_all', link: '/todos'},
            {name: 'About', icon: 'thumb_up', link: '/about'}
            // {name: 'Profile', icon: 'perm_identity', link: '/profile'} // Will work on this for future update.
          ]
        }
        return menuItems
      },
      userIsAuthenticated (){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }

  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
.gradient{
  background-image: linear-gradient(to right, #b21f1f, #fdbb2d); 
  color: whitesmoke;
}

.iconColor{
  color:#fdbb2d;
}

.fontText{
  font-family: 'Shadows Into Light', cursive;
}

</style>
