<template>
  <v-container grid-list-md>
   <v-layout row wrap>
     <v-flex lg4 md6 xs12 v-for="todoList in todos" :key="todoList.id">
       <v-card>
         <v-toolbar color="secondary" dark flat card>
           <v-toolbar-title>{{todoList.title}}</v-toolbar-title>
           <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>delete</v-icon>
          </v-btn>
         </v-toolbar>
         <v-list>
            <form class="inputForm" v-on:submit.prevent>
            <input 
               type="text" 
               class="todoInput"
               placeholder="Enter New Todo"
               onfocus="this.placeholder = ''"
               onblur="this.placeholder = 'Enter New Todo'"
              >
          </form>
          <v-list-tile avatar v-for="item in todoList.items" :key="item.id">
            <v-list-tile-action>
              <v-checkbox 
                color="success" 
                @click="todoCompleted(todoList.id, item.id)" 
                v-model="item.completed"
                ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title 
                v-text="item.todo" 
                v-bind:class="{completedItem: item.completed}"
                ></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-speed-dial 
                  direction="left"
                  open-on-hover
                  absolute 
                  right               
                  slide-x-reverse-transition
                  small
                >
                  <v-btn
                    slot="activator"
                    color="accent"
                    flat
                    dark
                    fab                    
                  >
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                <v-tooltip top color="info">
                  <v-btn
                    fab
                    dark
                    small
                    color="info"
                    slot="activator"
                    
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Edit Todo</span>
                 </v-tooltip> 
                  <v-tooltip top color="error">
                  <v-btn                   
                    fab
                    dark
                    small
                    color="error"
                    slot="activator"                    
                    
                  >
                    <v-icon>delete</v-icon>
                  </v-btn>
                  <span>{{"Delete " + item.todo + " ?"}}</span>
                  </v-tooltip>
                </v-speed-dial>
            </v-list-tile-action>
          </v-list-tile>
         </v-list>
       </v-card>
     </v-flex>
   </v-layout>
   <pre>{{this.$store.state.todos}}</pre>
  </v-container>
</template>


<script>
  export default {
    computed: {
      todos(){
        return this.$store.state.todos
      },
      
    },
    methods: {
      todoCompleted (todoListId, todoId){
        this.$store.commit({
          type: 'todoCompleted', 
          todoListId: todoListId, 
          todoId: todoId
          })        
        }
    }
  }

</script>

<style>
  .todoInput {
      margin-top: 0px;
      font-size: 18px;
      background-color:  #f7f7f7;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      color: #38321F;
      border: 1px solid rgba(0,0,0,0);
  }

  .inputForm {
    margin-top: 0px;
  }

  .completedItem {
	  text-decoration: line-through;
  }

</style>
