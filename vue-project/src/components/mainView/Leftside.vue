<template>
  <div>
    <el-row class="leftSideContent">
      <el-col>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title"><router-link to="/system/home">首页</router-link></span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <!-- slot="title"表示其为标题 ,即此template下的内容为标题-->
              <i class="el-icon-s-goods"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><router-link to="/system/cash">订单详情</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><router-link to="/system/personal">个人信息</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <router-view class="sonContent"></router-view>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>
<style>
.leftSideContent{
    width: 200px;
    height: 597px;
    /* user-select: none; */
    position: relative;
    background-color: #324057;
}
.el-menu{
   border: 0;
}
.el-menu-item-group__title{
  padding: 0;
}
.light{
   color: rgb(255, 208, 75);
}
.sonContent{
  width: 1166px;
  position: absolute;
  left: 200px;
  top: 0;
  bottom: 0;
  background-color:#fff;
}
a{
  text-decoration: none;
  color: #fff;
}
</style>