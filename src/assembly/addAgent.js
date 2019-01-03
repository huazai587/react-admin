import React,{ Component } from 'react';
import { Form,Input,Select,Button,message,DatePicker,Upload, Icon, Modal} from 'antd';
import { agentAdd ,cityList,uploadParams} from "../config/api";
const { Option, OptGroup } = Select;
class addAgent extends Component {
    state = {
        cityoptions:[],
        previewVisible: false,
        previewImage: '',
        fileList:[]
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
    componentDidMount(){
        this.getCityList()
    }
    handleCancel = () => this.setState({ previewVisible: false })
    
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) =>{
       if(!err){
          this.setState({
            company_name: values.company_name,
            phone: values.phone,
            city: values.city,
            loading:true
          },() =>{
            agentAdd(this.changePassForm).then(res => {
                let {ret_code,ret_msg,result} = res.data;
                this.logining = false;
                if (ret_code === 200) {
                  this.$message({
                    duration: 1000,
                    message: "添加成功",
                    type: "success"
                  });
                  window.setTimeout(() => {
                    this.$router.push({path:"/agentDetail",query:{agent_id:result.agent_id}});
                  }, 1000);
                } else {
                  this.$message.error(ret_msg);
                  this.changePassForm.city=this.cityLabel
                }
              });
          })
       }
      
    })
};
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              span: 2 ,
            },
            wrapperCol: {
               span:4 ,
            },
          };
          const { previewVisible, previewImage, fileList } = this.state;
          const uploadButton = (
            <div>
              <Icon type="plus" />
            </div>
          );
        return (
            <div>
            <Form onSubmit={this.handleSubmit}  >
            <Form.Item {...formItemLayout}
                    label="代理商名称:"

                    >
                    {getFieldDecorator('company_name',{
                        rules:[{
                            required:true,message:'请输入代理商联系人'
                        }]
                    })(
                    <Input 
                    placeholder="请输入代理商名称" />
                    )}
                    </Form.Item>
                    <Form.Item  {...formItemLayout}
                    label="联系人:"
                    >
                    {getFieldDecorator('name',{
                        rules:[{required:true,message:'请输入代理商联系人' }]
                    })(
                    <Input 
                    placeholder="请输入联系人电话" />
                    )}
                    </Form.Item>
                    <Form.Item  {...formItemLayout}
                    label="联系电话:"
                    >
                    {getFieldDecorator('phone',{
                        rules:[{required:true,message:'请输入联系电话' }]
                    })(
                    <Input 
                    placeholder="请输入代理商联系电话" />
                    )}
                    </Form.Item>
                    <Form.Item 
                    {...formItemLayout}
                    label="城市:">
                    {getFieldDecorator('city', {
                        initialValue: "",
                        rules:[{required:true,message:'请选择城市' }]
                    })(
                    <Select
                        style={{ width: 200 }}
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
                    <Form.Item  {...formItemLayout}
                    label="签约时间:"
                    >
                    {getFieldDecorator('sign_time',{
                    rules:[{required:true,message:'请选择签约时间' }]
                    })(
                    <DatePicker />
                    )}
                    </Form.Item>
                    <Form.Item  {...formItemLayout}
                    label="合同:"
                    >
                    {getFieldDecorator('contract_url')(
                        <Upload
                        action="//jsonplaceholder.typicode.com/posts/"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}
                        >
                        {fileList.length >= 10 ? null : uploadButton}
                        </Upload>
                    )}
                       <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
                    <Form.Item 
                    wrapperCol={{ span: 6, offset: 2}}
                    >      
                        <Button 
                        type="primary" 
                        htmlType="submit"
                        >
                        添加
                        </Button>
                        </Form.Item>
            </Form>
            </div>
        );
    }
}

//输出组件
export default Form.create()(addAgent);
