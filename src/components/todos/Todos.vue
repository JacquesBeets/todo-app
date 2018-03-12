<template>
    <v-container grid-list-md>
   <v-layout row wrap>
     <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          v-if="loading"
          indeterminate 
          :size="100" 
          :width="7" 
          color="primary"
          >
        </v-progress-circular>
     </v-flex>
     <v-flex lg4 md6 xs12 v-for="(todoList, itemObjKey) in todos" :key="todoList.id">
       <v-card>
         <v-toolbar color="secondary" dark flat card>
           <v-toolbar-title>{{todoList.title}}</v-toolbar-title>
           <v-spacer></v-spacer>
          <v-btn 
            icon
            @click="deleteTodoList(todoList.id)">
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
               @keyup.enter.prevent= "onNewInputText($event, itemObjKey, todoList.id)"
               :key="todoList.id"
               >
          </form>
          <v-list-tile avatar v-for="(item, index) in todoList.items" :key="index">
            <v-list-tile-action>
              <v-checkbox 
                color="success" 
                @click="todoCompleted(todoList.id, index)" 
                v-model="item.completed"
                ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title 
                v-text="item.todo"
                v-show="!item.edit" 
                v-bind:class="{completedItem: item.completed}"
                ></v-list-tile-title>
            </v-list-tile-content>
              <v-list-tile-content>
                  <input  
                  type="text"
                  v-show="item.edit == true"
                  class="todoInput" 
                  v-bind:value="item.todo"
                  @keyup.enter = "editTodoText(itemObjKey, index, $event), addEditedTodoTextToDb(todoList.id, index, $event)"
                  >
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
                    @click="editTodo(itemObjKey, index)"
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
                    @click="deleteTodo(todoList.id, index)"
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
   <pre>{{this.$data}}</pre> -->
   <!-- <h1>Store Data</h1>
   <pre>{{this.$store.state}}</pre> -->
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
      loading(){
        return this.$store.getters.loading
      }
      
    },
    methods: {
      todoCompleted (todoListKey, todoIndex) {
        this.$store.dispatch('todoCompleted',{ 
          todoListKey: todoListKey, 
          todoIndex: todoIndex
          })       
        },
      deleteTodo (todoListKey, todoIndex) {
        this.$store.dispatch('deleteTodo',{ 
          todoListKey: todoListKey, 
          todoIndex: todoIndex
          })
      },
      deleteTodoList (todoListKey) {
        this.$store.dispatch('deleteTodoList', todoListKey)
      },
      onNewInputText (event, todoListIndex, todoListKey) {
        const inputValue = event.target.value
          this.$store.dispatch('addItemInTodoList', {
            inputValue: inputValue,
            todoListIndex: todoListIndex,
            todoListKey: todoListKey
          })
          event.target.value = ''
      },
      editTodo (todoListIndex, todoId, event) {
          this.$store.commit({
            type: 'editTodo', 
            todoListIndex: todoListIndex, 
            todoId: todoId,
          })
      },
      editTodoText (todoListIndex, todoId, event) {
        const inputValue = event.target.value  
          this.$store.commit({
            type: 'editTodoText', 
            todoListIndex: todoListIndex, 
            todoId: todoId,
            inputValue: inputValue
          })
      },
      addEditedTodoTextToDb(todoListKey, todoIndex){
        const inputValue = event.target.value  
        this.$store.dispatch('addEditedTodoTextToDb', {
            inputValue: inputValue,
            todoIndex: todoIndex,
            todoListKey: todoListKey
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
