import React, { Component } from 'react';
import { Menu, Dropdown, Icon,message } from 'antd';
import { loginOut } from '../config/api';
import history from '../config/history';

class HeaderTop extends Component {
  state = {
    userName:'',
		login_cellphone:'',
  };
  //退出登录
  singOut = ()=>{
    loginOut().then(data=>{
        let {ret_code, ret_msg} = data.data;
        if(ret_code === 200){
          history.push("/");
        }else{
          message.error(ret_msg);
        }
       })
  };
	componentWillMount() {
    let reg = /^(\d{3})\d{4}(\d{4})$/;
    this.setState({
      userName : sessionStorage.getItem('name'),
      login_cellphone : sessionStorage.getItem('phone').replace(reg,'$1****$2')
    })
  };
  
render() {
  const menu = (
    <Menu>
    <Menu.Item key="0">
      <span>{this.state.userName}</span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>{this.state.login_cellphone}</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3" >
    <a   href="javacript:;"
      onClick={this.singOut}
      >退出登录</a>
    </Menu.Item>
  </Menu>
);
    return (
      <div style={{float:'right'}}>
        <Dropdown overlay={menu} >
          <a className="ant-dropdown-link" href="javacript:;">
            你好，{this.state.userName} <Icon type="down" />
          </a>
        </Dropdown>
    </div>
    )}
}

export default HeaderTop;