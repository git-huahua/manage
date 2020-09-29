<template>
   <div class="myform">
        <h2>花·在线后台采购系统</h2> 
        <register></register>
   </div>
</template>

<script>
import register from './register';
export default {
      components:{
          register
      }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.myform{
    margin-top: 80px;
}
.myform h2{
    color: #fff;
    margin-top: 10px;
    margin-left:205px;
}

.el-button--primary{
    width: 100%;
}
.el-form-item:nth-of-type(6) .el-form-item__content{
    margin-left: 0 !important;
}
</style>