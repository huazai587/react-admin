import React,{ Component } from 'react';
import { Table,Form,Row,Button,Select,Input,message,Pagination} from 'antd';
import { agentList,cityList } from "../config/api";
import './myCss.css';
const { Option, OptGroup } = Select;

class AgentList extends Component {
    constructor(props){
        super(props)
        this.state = {
            tableData:[],
            currentPage:1,
            pageSize:10,
            loading:true,
            pageTotal:50,
            company_name:"",
            phone:"",
            city:"",
            cityoptions:[]
        };
        this.onShowSizeChange = this.onShowSizeChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
           if(!err){
              this.setState({
                company_name: values.company_name,
                phone: values.phone,
                city: values.city,
                loading:true
              },() =>{
                this.getagentlist()
              })
           }
          
        })
    };
    // 请求城市
    getCityList(){
        cityList().then(data => {
            let { ret_code, ret_msg, result } = data.data;
            if (ret_code === 200) {
                this.setState({
                    cityoptions:result
                })
            } else {
               message.error(ret_msg);
            }
          });
    }
    // 列表请求
    getagentlist() {
        let orderParams = {
          page: this.state.currentPage,
          page_size: this.state.pageSize,
          company_name: this.state.company_name,
          phone: this.state.phone,
          city: this.state.city
        };
        agentList(orderParams).then(data => {
          let { ret_code, ret_msg, result } = data.data;
          if (ret_code === 200) {
            this.setState({
                loading:false,
                pageTotal:Number(result.count),
                tableData:result.list
            })
          } else {
            message.error(ret_msg);
          }
        });
      };
    onChange(page, pageSize) {
        this.setState({
            currentPage:page,
            loading:true
        },()=>{
            this.getagentlist()
        })
        
    }  
    onShowSizeChange(current, pageSize) {
        this.setState({
            currentPage:current,
            pageSize:pageSize,
            loading:true
        },() =>{
            this.getagentlist()
        })
        
    }
    componentWillMount(){
        this.setState({loading:false});
        this.getagentlist();
        this.getCityList()
    }
    render() {
        const data = this.state.tableData;
        const columns = [
            {
              title: '代理商名称', 
              width: 250, 
              dataIndex: 'company_name', 
              key: 'company_name', 
              fixed: 'left',
            },
            { title: '联系人', dataIndex: 'name', key: 'name' },
            { title: '联系人电话', dataIndex: 'phone', key: 'phone' },
            { title: '租赁公司数量', dataIndex: 'company_count', key: 'company_count' },
            { title: '城市', dataIndex: 'city', key: 'city' },
            { title: '签约时间', dataIndex: 'sign_time', key: 'sign_time' },
            {
              key: 'operation',
              fixed: 'right',
              width: 100,
              render: () =><span><a href="javascript:;">查看</a>
                 <a href="javascript:;">账号管理</a></span>,
            },
          ];
        const { getFieldDecorator } = this.props.form;
        const pagination ={
            total: this.state.pageTotal,
            showSizeChanger: true,
            showQuickJumper:true,
            onShowSizeChange:this.onShowSizeChange,
            onChange:this.onChange
        }
          return (
            <div>
                <div className="mb20">
                <Form 
                onSubmit={this.handleSearch} 
                layout="inline">
                  <Row>
                    <Form.Item 
                    label="代理商名称:"
                    >
                    {getFieldDecorator('company_name')(
                    <Input 
                    placeholder="请输入代理商名称" />
                    )}
                    </Form.Item>
                    <Form.Item 
                    label="联系人电话:"
                    >
                    {getFieldDecorator('phone')(
                    <Input 
                    placeholder="请输入联系人电话" />
                    )}
                    </Form.Item>
                    <Form.Item label="城市:">
                    {getFieldDecorator('city', {initialValue: ""})(
                    <Select
                        style={{ width: 200 }}
                        onChange={this.handleChange}
                    >
                       {
                           this.state.cityoptions.map((item) =>(
                            <OptGroup label={item.label}>
                               {
                                   item.options.map((itemlist) =>
                                    <Option value={itemlist.value}>{itemlist.label}</Option>
                                   )
                               }
                           </OptGroup>
                           )
                           )
                       }
                       
                    </Select>
                    )}
                    </Form.Item>
                    <Form.Item>      
                        <Button 
                        type="primary" 
                        htmlType="submit"
                        >
                        搜索
                        </Button>
                        </Form.Item>
                  </Row>
                  
                </Form>
                </div>
                <Table 
                loading={this.state.loading}
                columns={columns} 
                dataSource={this.state.tableData?data:null} 
                bordered
                pagination={pagination}
                scroll={{ x: 1300 }} />
            </div>
        );
    }
}

//输出组件
export default Form.create()(AgentList);
