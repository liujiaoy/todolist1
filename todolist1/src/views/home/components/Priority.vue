<template>
  <el-select 
    v-model="value" 
    :disabled=disabled 
    placeholder="请选择"
    @input="handlePriorityChange"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import priorityObj from '@/assets/js/priority.js'
  export default {
    name:'PrioritySelect',
    props:{
        defaultVal:{
        // type:String,
        default:''
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data() {
      return {
        options: priorityObj,
        value: this.defaultVal
      }
    },
    methods:{
        handlePriorityChange(){
            this.$emit("change",this.value)
        }
    }
  }
</script>