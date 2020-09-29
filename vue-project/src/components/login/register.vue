<template>
  <div class="reg">
      <el-form :model="formData" ref="form" label-width="80px" :rules="rules" :offset="30">
        <el-form-item label="用户名" prop='reguesrName'>
          <el-input v-model="formData.reguesrName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='regemail'>
          <el-input v-model="formData.regemail"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='regpassword'>
          <el-input v-model="formData.regpassword" type='password'></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop='regpassworded'>
          <el-input v-model="formData.regpassworded" type='password'></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop='regidentify'>
          <el-select placeholder="请选择" v-model="formData.regidentify">
            <el-option label="普通用户" value='user'></el-option>
            <el-option label="管理员" value='manage'></el-option>          
         </el-select>
        </el-form-item>       
        <el-form-item >
          <el-button type="primary" @click="onSubmit('form')">注册</el-button>
        </el-form-item>
      </el-form>
      <router-link to="/login">返回登录</router-link>
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
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {         
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formData.regpassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
           formData:{
               reguesrName:'',
               regemail:'',
               regpassword:'',
               regpassworded:'',
               regidentify:''
           },
           rules:{
              reguesrName:[
                  { required: true, message: '用户名不能为空', trigger: 'blur' },
                  { validator: validateName, trigger: 'blur' }
              ],
              regemail:[
                 { required: true, message: '格式不正确', trigger: 'blur',type:"email"},
              ],
              regpassword:[
                  { required: true, message: '密码不能为空', trigger: 'blur' },
                   {min: 6,max: 10,message: "长度在 6 到 10 个字符",trigger: "blur",},
              ],
              regpassworded:[
                 { required: true, message: '请再次输入密码', trigger: 'blur' },
                 { validator: validatePass2, trigger: 'blur' }
              ],
              regidentify:[
                 { required: true, message: '请选择身份', trigger: 'blur' }
              ]
           }
        }
      },
      methods: {
          onSubmit(form){
              this.$refs[form].validate((valid) => {//$refs[form]变量无法通过点获得，用中括号
              if (valid) {
                   this.axios.post('http://127.0.0.1:3000/register',this.formData)
                   .then(res => {
                      if (res.data.code==0) {
                         this.$message({
                            type:'warning',
                            message:res.data.message
                         })
                      }else if(res.data.code==1) {
                          this.$message({
                             message: res.data.message,
                             type: 'success'
                           });  
                           window.localStorage.setItem('name', JSON.stringify(this.formData.reguesrName))  
                           this.$router.push('/system')   
                           this.$store.commit('save_userInfo',res.data.name)
                          //  sessionStorage.setItem('username',JSON.stringify(res.data.name))
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
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body{
  background-image: url('../../assets/imgs/bgi.jpg');
  background-repeat: no-repeat;
}
.reg{
    width: 300px;
    padding: 20px;
    text-align: center;
    margin:10px 150px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 10px 10px 15px #666;
    border: 1px solid #ccc;
}
.reg a{
   font-size: 13px;
}
</style>
