import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[]
  },
  getters:{
    //已完成
    doneTodos: state => {
      // if(!state.todos.length && localStorage.getItem("todos")){
      //   state.todos = JSON.parse(localStorage.getItem("todos"))
      // }
      return state.todos.filter(todo => todo.done)
    },
    //进行中
    doingTodos: state => {
      
      return state.todos.filter(todo => !todo.done)
    },
  },
  mutations: {
    //增加新的todo
    addTodo(state,item){
      state.todos.push(item);
    },
    //删除todo
    delTodo(state,id){
      state.todos.splice(state.todos.findIndex(item => item.id === id), 1)
    },
    getTodoLocalStorage(state){
      if(localStorage.getItem("todos")){
        state.todos = JSON.parse(localStorage.getItem("todos"))
      }
    },
    setTodoLocalStorage(state){
      if(state.todos.length){
        console.log(222);
        localStorage.setItem("todos",JSON.stringify(state.todos))
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
