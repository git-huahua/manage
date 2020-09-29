<template>
    <div class="common">
         <div class="banner">
         <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <i class="iconfont icon-logo"></i>
                    <span>花·在线后台采购系统</span>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <img src="https://picsum.photos/80/50" alt="">
                    <div class="person">
                        <p>欢迎您</p>
                        <p>{{getName}}</p>
                    </div>
                    <div>
                           <el-dropdown trigger="click">
                             <span class="el-dropdown-link">
                               <i class="el-icon-arrow-down el-icon--right"></i>
                             </span>
                             <el-dropdown-menu slot="dropdown">
                               <el-dropdown-item command="info" @click.native="info">个人信息</el-dropdown-item>
                               <el-dropdown-item command="signout"  @click.native="out">退出</el-dropdown-item>
                                <!-- el-dropdown-item添加事件要加native修饰符 -->
                             </el-dropdown-menu>
                           </el-dropdown>
                    </div>
                </div>
            </el-col>
         </el-row>
    </div>
             <Leftside/>
    </div>
</template>

<script>
import Leftside from './Leftside';
import '@/assets/css/icon.css';
import {mapState} from 'vuex';
export default {
     computed: {
        ...mapState({
            getName:'uesr_Info' 
        })
     },
     components:{
         Leftside
     },
     methods: {
         out(){
            localStorage.removeItem('viewname');
            this.$router.push('/login') 
         },
         info(){
             this.$router.push('/system/personal') 
         }
     },
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li{
    list-style: none;
}
.common{
    position: relative;
}
.banner{
    padding: 0 30px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #2b3a52;
    background-color: #324057;
}
.icon-logo{
    font-size: 50px;
    color: #4b7ecf;
}
.bg-purple,.bg-purple-light{
    height: 60px; 
    display: flex;
    align-items: center;
}
.bg-purple-light{
    margin-right: 30px;
    justify-content: flex-end;
}
.bg-purple span{
    color: white;  
    margin-left: 15px;
}
.bg-purple-light img{
    border-radius: 50%;
}
.person{
    text-align: center;
    margin-left: 5px;
}
.person p{
    color: white;
    font-size: 15px;
}
.person p:nth-of-type(2){
    color: #fff;
    cursor: pointer;
}
.el-dropdown{
    color: white;
    border: 0;
}
</style>