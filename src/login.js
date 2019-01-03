import React,{ Component } from 'react';
import {  Form, Icon, Input, Button,message} from 'antd';
import { getVerifycode, requestLogin } from "./config/api"; 
import "./assets/css/login.css";
class LoginFrom extends Component {
    state = {
        isActive: true,
        logining: false,
        hidden: false,
        title: "易到用车 · 合作伙伴后台",
        msg: "发送验证码",
        show: false,
        disabled: false,
        getPicVerify: `/api/adminlogin/verifycode?time=${new Date().getTime()}`,
        count: 59,
        telphone:'',
        picCode:'',
        smsCode:''
    }
      getPic = () => {
        this.setState({
          getPicVerify : `/api/adminlogin/verifycode?time=${new Date().getTime()}`
        })
      };
      handleGetInputValue = (event) => {
        this.setState({
          telphone : event.target.value,
        })
      };
      handleGetPicValue = (event) => {
        this.setState({
          picCode : event.target.value,
        })
      };
      sendCode = () => {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(168)|(17[0-9])|(18[0-9])|(19([6]|[8-9])))\d{8}$/;
        if (!reg.test(this.state.telphone)) {
          message.error(`请正确输入手机号`);
          return;
        }
        if (this.state.picCode === "") {
          message.error(`请输入图形验证码`);
          return;
        } else {
          let params = {
            phone: this.state.telphone,
            img_code: this.state.picCode
          };
  
          getVerifycode(params).then(data => {
            let { ret_code, ret_msg } = data.data;
            let count = this.state.count;
            if (ret_code === 200) {
              this.setState({
                msg: `重新发送${count}s`,
                disabled:true
              })
              let clock = setInterval(() => {
                this.setState({
                  count:(count--),
                  msg: `重新发送${count}s`
                  
                })
                if (count <= 0) {
                  clearInterval(clock);
                  this.setState({
                    msg: `重新发送`,
                    count:59,
                    disabled:false
                  })
                }
              }, 1000);
            } else {
              this.getPic();
              message.error(ret_msg);
            }
          });
        }
      };
      //登录
      handleSubmit = (e)=> {
        e.preventDefault();
        let history = this.props.history;
        this.props.form.validateFields((errors,values)=>{
          if (!errors) {
              let loginParams = {
                phone: values.telphone,
                sms_code: values.smsCode
              };
              requestLogin(loginParams).then(res => {
                let { ret_msg, ret_code } = res.data;
                let { name, phone } = res.data.result;
                if (ret_code === 200) {
                  sessionStorage.setItem("user", "123");
                  sessionStorage.setItem("name", name);
                  sessionStorage.setItem("phone", phone);
                  message.success( '登录成功');
                  history.push("/main/agentList" );
                }else {
                  message.error(ret_msg);
                }
              });
            }
         })
       };
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="demo-ruleForm loginContainer">
        <h3 className="logo-title">易到用车 · 合作伙伴管理后台</h3>
        <Form.Item>
          {getFieldDecorator('telphone', {
            rules: [{ required: true, message: '请输入手机号!' }],
          })(
            <Input size="large"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={this.handleGetInputValue}
             placeholder="手机号" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('picCode', {
            rules: [{ required: true, message: '请输入图形验证码!' }],
          })(
            <Input size="large"
            className="w170"
            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={this.handleGetPicValue}
            type="text" placeholder="图形验证码" />
          )}
           <span class="getPic">
            <img 
            alt=''
            src={this.state.getPicVerify} 
            onClick={this.getPic}/>
          </span>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('smsCode', {
            rules: [{ required: true, message: '请输入短信验证码!' }],
          })(
            <Input type="text" placeholder="短信验证码" size="large"  />
          )}
          <Button 
          className="send_code"
          type="button"
          disabled={this.state.disabled}
          ghost="true"
          onClick={this.sendCode}
          >{this.state.msg}</Button>
        </Form.Item>
        <Form.Item>      
          <Button 
          type="primary" 
          htmlType="submit"
          className="login-form-button">
          登录
          </Button>
        </Form.Item>
      </Form>
        )
    }
}

const Login = Form.create()(LoginFrom);
export default Login;


