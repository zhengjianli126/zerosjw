import axios from 'axios'
import {router} from '../router/index'
import Cookies from 'js-cookie';

let root = process.env.API_ROOT||'';
let axiosAjax =  axios.create({
    baseURL:root,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    timeout: 30000
});
// axiosAjax.interceptors.request.use(
//     config => {
//         console.log(config)
        
//         return config;
//     },
//     err => {
//         console.log(err)
//         return Promise.reject(err);
//     }); 
// axiosAjax.interceptors.response.use(
//         res => {
//             console.log(res)
            
//             if(res.data.code==40003||res.data.code===40013){
//                 //登录超时  跳转
//             Cookies.remove('user');
//             Cookies.remove('userId');
//             Cookies.remove('organizeId');
//             Cookies.remove('bindId');
//             Cookies.remove('topOrganize')
//                 router.push({
//                     name: 'login'
//                 }); 
//             }
//             return res;
//         },
//         error => {
//             console.log(error)
//             Cookies.remove('user');
//             Cookies.remove('userId');
//             Cookies.remove('organizeId');
//             Cookies.remove('bindId');
//             Cookies.remove('topOrganize')
//                 router.push({
//                     name: 'login'
//                 }); 
//             return Promise.reject(error.response.data) 
//         });
    export default axiosAjax