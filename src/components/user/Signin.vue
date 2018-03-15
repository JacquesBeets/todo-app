<template>
<v-parallax src="/static/firebase-background.jpg" alt="FirePencil Homepage Background" height="885">
 <v-container>
   <v-layout row v-if="error">
     <v-flex xs12 sm6 offset-sm3>
       <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
     </v-flex>
   </v-layout>
   <v-layout row>
     <v-flex xs12 sm6 offset-sm3>
       <v-card class="mt-5">
         <v-card-text>
          <v-container>
            <form @submit.prevent="onSignin">
              <v-layout row>
                <v-flex xs 12>
                  <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      >
                    </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs 12>
                  <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      >
                    </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn
                  class="primary white--text"
                  :loading="loading"
                  :disabled="loading" 
                  type="submit"
                  >
                  Sign In
                  </v-btn>
                  <v-btn
                  class="primary white--text"
                  :to="'/register'"
                  >
                  Register
                  </v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
       </v-card>
     </v-flex>
   </v-layout>
 </v-container>
</v-parallax>
</template>

<script>
export default {
  data (){
    return {
      email: '',
      password:''
    }
  },
  computed: {
    user (){
      return this.$store.getters.user
    },
    error (){
      return this.$store.getters.error
    },
    loading (){
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if(value !== null && value !== undefined){
        this.$router.push('/todos')
      }
    }
  },
  methods: {
    onSignin (){
      this.$store.dispatch('signUserIn', {
        email: this.email,
        password: this.password
      })
    },
    onDismissed(){
      this.$store.dispatch('clearError')
    }
  }
}
</script>


