<template>
     <div class="info"> 
            <header>
                <div class="top"><h2>信息设置</h2></div>          
                <div class="photo">
                    <img src="../../assets/imgs/111.jpg">
                    <h1>{{getUser}}</h1>
                </div>  
            </header>        
     </div>
</template>

<script>
export default {
    computed: {
        getUser(){
            return  this.$store.state.uesr_Info
        }
    },
}
</script>

<style>
.info header{
    width: 100%;
    height: 200px;
    position: relative;
    text-align: center;
    background-color:#fff;
}
.info .top{
    width: 100%;
    height: 90px;
    text-align: left;
    line-height: 90px;
    color: #223e6b;
    background-color: #ccc;
}
.photo{
    width: 130px;
    height: 130px;
    padding: 5px;
    position: absolute;
    left: 45%;
    top: 35%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: #fff;
}
.photo img{
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
</style>