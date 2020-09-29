import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex)
const store = new Vuex.Store({
     state:{
         uesr_Info:JSON.parse(localStorage.getItem('viewname')),
        //  data:null
     },
     mutations:{
        save_userInfo(state,data){
            localStorage.setItem('viewname',JSON.stringify(data))
        }
     }
})
export default store