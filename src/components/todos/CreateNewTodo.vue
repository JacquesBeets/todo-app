<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="500px">
        <v-btn
          dark
          fab
          fixed
          bottom
          right
          color="primary"
          slot="activator"
          @click.native.stop="dialog = true"
        >
        <v-icon>add</v-icon>
        </v-btn>
      <v-btn
        dark
        fab
        fixed
        bottom
        right
        color="primary"
        slot="activator"
        @click.native.stop="dialog = true"
      >
      <v-icon>add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Create New Todo List</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field 
                  label="Todo List Title"
                  hint="What shall we call your new Todo List?"
                  v-model="todoListTitleText"
                  @keyup.enter="dialog = false, newTodoList()"
                  ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn 
            color="blue darken-1" 
            flat 
            @click.native="dialog = false, newTodoList()"
            >Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
  export default {
    data() {
      return {
        todoListTitleText: '',
        dialog: false
      }
    },
    methods: {
      newTodoList () {
        const inputText = this.todoListTitleText
          this.$store.commit({
            type: 'newTodoList', 
            inputText: inputText
          })
          this.todoListTitleText = ''   
      }
    }
  }
  
</script>
