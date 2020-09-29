<template>
    <div class="log">
        <h2>花·在线后台采购系统</h2> 
        <div class="loginner">            
         <el-form :model="formData" ref="form" label-width="80px" :rules="rules">
             <el-form-item label="用户名" prop='logname'>
                 <el-input v-model="formData.logname"></el-input>
             </el-form-item>
             <el-form-item label="密码" prop='logpass'>
                 <el-input v-model="formData.logpass" type='password'></el-input>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="logSubmit('form')">登录</el-button>
             </el-form-item>
         </el-form>
          <span class="count">没有账户？<router-link to="/register">去注册</router-link> </span>
        </div>  
             
    </div>
</template>

<script>
export default {
      data() {
          var validateName = (rule, value, callback) => {
         var reg=/^\w{3,15}$/
         if (!reg.test(value)){
               callback(new Error('字母数字下划线组成3-15位'));
         }else {
          callback();
        }
       };
          return {
              formData:{
                   logname:'' ,
                   logpass:''
            },
            rules:{
                logname:[
                      { required: true, message: '用户名不能为空', trigger: 'blur' },
                      { validator: validateName, trigger: 'blur' }
                ],
                logpass:[
                    { required: true, message: '密码不能为空', trigger: 'blur'},
                   {min: 6,max: 10,message: "长度在 6 到 10 个字符",trigger: "blur",},
                ]
            },
           
          }
      },
      methods: {
         logSubmit(form){
           this.$refs[form].validate((valid) => {
            if (valid) {
                this.axios({
                    method:'post',
                    url: 'http://127.0.0.1:3000/log',
                    data: this.formData,                    
                })
                .then(res=>{
                     if (res.data.code==2) {
                    this.$message({
                          type:'success',
                          message:res.data.message
                       })
                    //  window.localStorage.setItem('name', JSON.stringify(this.formData.logname)) 
                     this.$store.commit('save_userInfo',res.data.name)   //将登录名存入vuex     
                     this.$router.push('/system')                                   
                     
                 }else if (res.data.code==3) {
                     this.$message({
                          type:'warning',
                          message:res.data.message
                       })
                 }
                }) 
                .catch(err => {
                 console.error(err); 
             })   
          } else {
            console.log('error submit!!');
            return false;
          }
        });
         }
      },
}
</script>

<style>
body{
  background-image: url('../../assets/imgs/bgi.jpg');
  background-repeat: no-repeat;
}
*{
    margin: 0;
    padding: 0;
}
.log{
    margin-top: 80px;
}
.log h2{
     color: #fff;
    margin-top: 10px;
    margin-left:205px;
}
.loginner{
    width: 300px;
    padding: 20px;
    text-align: center;
    margin:10px 150px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 10px 10px 15px #666;
    border: 1px solid #ccc;
}
.el-button--primary{
    width: 100%;
}
.el-form-item{
    margin-right: 20px !important;
}
.count,.count a{
    font-size: 13px;
}
</style>