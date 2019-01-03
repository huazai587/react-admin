
import axios from 'axios';
import { message } from 'antd';
// import router from '../router'; //引入路由
import history from './history';
axios.defaults.withCredentials=true
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.data.ret_code === 401){
      message.error(response.data.ret_msg);
      history.push("/" );
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


/*获取图形验证码*/
export const getPicVerifycode = params => { return axios.get(`/api/adminlogin/verifycode`, { params: params }); };
/*获取短信验证码*/
export const getVerifycode = params => { return axios.get(`/api/adminlogin/sendSMS`, { params: params }); };
/*短信验证码登录*/ 
export const requestLogin = params => { return axios.get(`/api/adminlogin/login`, { params: params }); };
/*退出登录*/
export const loginOut = params => { return axios.get(`/api/adminlogin/logout`, { params: params }); };

/*代理商添加*/
export const agentAdd = params => { return axios.get(`/api/admin/agentAdd`, { params: params }); };
/*代理商更新*/
export const agentUpdate = params => { return axios.get(`/api/admin/agentUpdate`, { params: params }); };
/*获取代理商列表*/
export const  agentList= params => { return axios.get(`/api/admin/searchAgent`, { params: params }); };
/*获取代理商详情*/
export const  agentDetail= params => { return axios.get(`/api/admin/agentDetail`, { params: params }); };
/*获取城市列表*/
export const  cityList= params => { return axios.get(`/api/admin/searchCity`, { params: params }); };
/*获取代理商账号列表*/
export const  agentAccountList= params => { return axios.get(`/api/admin/searchUser`, { params: params }); };
/*代理商账号添加*/
export const agentAccountAdd= params => { return axios.get(`/api/admin/userAdd`, { params: params }); };
/*代理商账号更新*/
export const agentAccountUpdate= params => { return axios.get(`/api/admin/userUpdate`, { params: params }); };
/*上传图片请求参数获取*/
export const uploadParams= params => { return axios.get(`/api/admin/uploadParams`, { params: params }); };


/*司机列表*/
export const driverList = params => {return axios.get(`/api/driver/searchByAgent`,{params:params});};
/*司机信息详情*/
export const driverInfo = params => {return axios.get(`/api/driver/detail`,{params:params});};
/*申请加盟列表*/ 
export const registerInfo = params => {return axios.get(`/api/driver/searchRegisterByAgent`,{params:params});};
/*申请加盟司机详情*/
export const registerDetail = params => {return axios.get(`/api/driver/registerDetail`,{params:params});};
// 租赁公司列表
export const searchByAgent = params => {return axios.get(`/api/company/searchByAgent`,{params:params});};
// 租赁公司详情
export const companyDetail = params => {return axios.get(`/api/company/detail`,{params:params});};
