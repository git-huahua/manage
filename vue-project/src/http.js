import axios from 'axios';
import { Loading ,Message } from 'element-ui';

//加载动画
let loading;
function startLoding() {
    loading=Loading.service({
        lock:true,
        text:'玩命加载中...',
        background:'rgba(0,0,0,0.7)'
    });
}
//结束动画
function endLoading() {
    loading.close()
}
//请求拦截   请求的时候加载动画
axios.interceptors.request.use(config => {
     // 加载动画
      startLoding()
      return config;
    },error => {
   return Promise.reject(error);
   });
  

//响应拦截  请求结束给响应时就要把动画停止
axios.interceptors.response.use(response => {
      // 停止动画
     endLoading()
     return response;
   },error => {
   // 错误提醒
   endLoading()  
   Message.error(error.response.data)
   return Promise.reject(error);
   });
export default axios