//此文件用于axios拦截请求作用，axios服务器转发地址见package.js
import axios from 'axios'
import { Toast } from 'antd-mobile'
//效果：所有数据在前端与后台交互过程中都会通过拦截器，从而在请求数据过程中显示“加载中”字样，这里使用蚂蚁金服加载动画插件
//使用蚂蚁金服插件时注意在index.js中引入蚂蚁金服官方css库
//拦截请求
axios.interceptors.request.use(function(config){
    Toast.loading('加载中')
    return config;
})
//拦截响应
axios.interceptors.response.use(function(config){
    Toast.hide();
    return config;
})