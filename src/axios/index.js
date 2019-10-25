import axios from 'axios'

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截
axios.interceptors.request.use(config=> {
    
    return config;
},
error=>{
    return Promise.reject(error);
} )

//拦截响应
axios.interceptors.response.use(response=>{
    return response
}, error=>{
    return Promise.reject(error)
})

export default axios;
