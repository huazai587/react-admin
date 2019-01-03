import React, { Component } from 'react';
import { Layout,Menu,Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import logo from './assets/logo.png';
import './App.css';
import HeaderTop  from './components/headerTop.js';
const { Header,Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class SiderDemo extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
};
onCollapse = (collapsed) => {
  console.log(collapsed);
  this.setState({ collapsed });
}

handleClick = (item,key,selectedKeys) => {
  this.setState({
      current: item.key
  });
}

render() {
    return (
        <Layout style={{minHeight:'100vh'}}>
            <Sider 
            collapsible 
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse} 
            >
            <div >
              <div className="logo">
              <img src={logo} alt="logo"/>
              </div>
            </div>
                <Menu 
                theme="dark" 
                mode="inline" 
                defaultSelectedKeys={['1']}
                selectedKeys={[this.state.current]} 
                onSelect={this.handleClick}>
                    <SubMenu
                      key="sub1"
                      title={<span><Icon type="user" /><span>代理商管理</span></span>}
                    >
                      <Menu.Item key="1">
                      <NavLink to="/main/agentList" activeClassName="active" exact>
                        <span className="nav-text">代理商列表</span>
                      </NavLink>
                      </Menu.Item>
                      <Menu.Item key="2">
                      <NavLink to="/main/addAgent" activeClassName="active" exact>
                        <span className="nav-text">添加代理商</span>
                      </NavLink>
                      </Menu.Item>

                    </SubMenu>
                </Menu>
            </Sider>
            <Layout>
                <Header>
                   <HeaderTop history={this.props.history}/> 
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>
                         {this.props.children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
}
export default SiderDemo;

