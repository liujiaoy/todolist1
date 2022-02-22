<template>
  <div>
    <el-header class="top">
      <el-row>
        <el-col :span="1">
          <priority
           ref="level"
           defaultVal="1"
           ></priority>
        </el-col>
        <el-col :span="12">
          <el-input 
            v-model="input" 
            placeholder="请输入内容"
            @keyup.enter.native="enterTodo"
          ></el-input>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="12" class="todolist">
          <div class="title">进行中</div>
          <list-item :list=doingTodos></list-item>
        </el-col>
        <el-col :span="12" class="donelist">
          <div class="title">已完成</div>
          <list-item :list=doneTodos></list-item>
        </el-col>
      </el-row>
    </el-main>

  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import ListItem from './components/ListItem.vue'
import Priority from './components/Priority.vue'
export default {
  components: { ListItem, Priority },
  name:'',
  data () {
    return {
      input:'',
    }
  },
  computed:{
    ...mapState(['todos']),
    ...mapGetters({
      doneTodos:"doneTodos",
      doingTodos:"doingTodos"
    })
  },
  methods: {
    enterTodo(){
      if(!this.input) return 
      let item = {
        text:this.input,
        done:false,
        date:this.date.dateFormat("",'yyyy-MM-dd hh:mm:ss'),
        level:this.$refs.level.value
      }
      item.id = this.todos.length == 0? 0 :this.todos[this.todos.length-1].id +1 ;
      // console.log(item);
      this.$store.commit("addTodo",item);
      this.input = '';
    },
    handleBeforeUnload(){
      this.$store.commit("setTodoLocalStorage");
    }
  },
  mounted(){
    window.addEventListener("beforeunload",this.handleBeforeUnload)   
  },
  beforeCreate(){
    this.$store.commit("getTodoLocalStorage");
  }

}
</script>
<style lang="scss" scoped>
.title{
  font-size: 1.5rem;
}
.grey-dark{
  color: darkgrey;
}

.todolist{
  height: 500px;
  overflow: auto;
  padding: 10px;
  ::v-deep .el-row{
    border-bottom:1px solid #ccc;
    font-size: 20px;
    padding: 5px;
  }
  
} 
.donelist{
  padding: 10px;
  height: 500px;
  overflow: auto;
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: #DCDFE6;
    border-color: #DCDFE6;
    
  }
  ::v-deep .el-row{
    border-bottom:1px solid #ccc;
    font-size: 20px;
    color:#aaa;
    padding: 5px;
  }
}
</style>