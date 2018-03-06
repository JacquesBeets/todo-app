<template>
    <v-container grid-list-md>
   <v-layout row wrap>
     <v-flex lg4 md6 xs12 v-for="(todoList, index) in todos" :key="index">
       <v-card>
         <v-toolbar color="secondary" dark flat card>
           <v-toolbar-title>{{todoList.title}}</v-toolbar-title>
           <v-spacer></v-spacer>
          <v-btn 
            icon
            @click="deleteTodoList(index)">
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
               @keyup.enter.prevent= "inputText($event, index)"
               :key="index"
               >
              
          </form>
          <v-list-tile avatar v-for="item in todoList.items" :key="item.id">
            <v-list-tile-action>
              <v-checkbox 
                color="success" 
                @click="todoCompleted(index, item.id)" 
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
                    @click="deleteTodo(index, item.id)"
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
     
     <new-todo></new-todo>
   </v-layout>
   
   <!-- <h1>Page Data</h1>
   <pre>{{this.$data}}</pre>
   <h1>Store Data</h1>
   <pre>{{this.$store.state.todos}}</pre> -->
  </v-container>
</template>


<script>
  import NewTodo from '@/components/todos/CreateNewTodo.vue'

  export default {
    components: {
      'new-todo': NewTodo
    },
    data() {
    return {
      todoListTitleText: '',
      
    }
  },
    computed: {
      todos(){
        return this.$store.state.todos
      },
      
    },
    methods: {
      todoCompleted (todoListIndex, todoId) {
        this.$store.commit({
          type: 'todoCompleted', 
          todoListIndex: todoListIndex, 
          todoId: todoId
          })       
        },
      deleteTodo (todoListIndex, todoId) {
        this.$store.commit({
          type: 'deleteTodo', 
          todoListIndex: todoListIndex, 
          todoId: todoId
        })
      },
      deleteTodoList (todoListIndex) {
        this.$store.commit({
          type: 'deleteTodoList', 
          todoListIndex: todoListIndex
        })
      },
      inputText (event, todoListIndex) {
        const inputValue = event.target.value
          this.$store.commit({
            type: 'addTodo',
            inputValue: inputValue,
            todoListIndex: todoListIndex
          })
          event.target.value = ''
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
