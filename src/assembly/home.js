import React,{ Component } from 'react';
import { Layout,Breadcrumb, Divider} from 'antd';
const {  Content } = Layout;
//自定义组件SiderDemo
class SiderDemo extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <h3></h3>
                // <Layout>
                //     {/* <Content style={{ margin: '0 16px' }}>
                //         <Breadcrumb style={{ margin: '12px 0' }}>
                //             <Breadcrumb.Item>User</Breadcrumb.Item>
                //             <Breadcrumb.Item>Bill</Breadcrumb.Item>
                //         </Breadcrumb>
                //         <div style={{ padding: 24, background: '#fff', minHeight: 780 }}>

                //         </div>
                //     </Content> */}
                // </Layout>
        )
    }
}

//输出组件
export default SiderDemo;
