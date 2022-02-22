<template>
  <div>
    <el-row v-for="item of list" :key="item.id" class="grey-dark" >    
      <el-col :span="1">
        <el-checkbox 
        v-model="item.done"
        ></el-checkbox>
      </el-col>
      <el-col :span="2">
        <priority 
          :defaultVal="item.level"
          :disabled="item.done"
          @change="handlePriorityChange($event,item)"
        ></priority>
      </el-col>
      <el-col :span="12"><div >{{item.text}}</div></el-col>
      <el-col :span="6">
        <div>{{item.date}}</div>
      </el-col>
      <el-col :span="2" class="color-blue">
        <div @click="delTodo(item.id)">删除</div>
        <input type="file" multiple accept=".png, .jpg, .jpeg" @change="getFile($event)">
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Priority from './Priority.vue';
export default {
  components: { Priority },
  name:'ListItem',
  props:{
    list:Array
  },
  data () {
    return {
      
    }
  },
  methods: {
    delTodo(id){
      this.$store.commit("delTodo",id);
    },
    handlePriorityChange(value,item){
      // console.log(item);
      item.level = value;
    },
    getFile(event){
      var file = event.target.files;
      console.log(file);
      // for(var i = 0;i<file.length;i++){
      //   //    上传类型判断
      //   var imgName = file[i].name;
      //   var idx = imgName.lastIndexOf(".");  
      //   if (idx != -1){
      //       var ext = imgName.substr(idx+1).toUpperCase();   
      //       ext = ext.toLowerCase( ); 
      //       if (ext!='pdf' && ext!='doc' && ext!='docx'){
                
      //       }else{
      //             this.addArr.push(file[i]);
      //       }   
      //   }
      // }
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
</style>