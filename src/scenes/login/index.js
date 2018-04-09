import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser,verifyUser } from "../../actions/loginActions"
import { Form, Spin,notification, Icon, Input, Button, Checkbox, InputNumber } from 'antd'
const FormItem = Form.Item;

@connect((store) => {
  console.log(store);
  return {
    user: store.login.user,
    loading : store.login.fetching
  };
})

class NormalLoginForm extends React.Component {

  componentWillReceiveProps(nextProps){
    if(nextProps.user.logged){
      this.props.router.push("/");
    }
  }

  Notify = (type,message,desc) => {
    notification[type]({
      message: message,
      description: desc,
    });
  };

  handleVerification = (e) =>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(verifyUser(this.props.user.token.request_token,values));
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(loginUser(values));
        console.log('Received values of form: ', values);
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { verifying } = this.props.user;
    console.log(this.props.loading);    
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Spin size="large" spinning={this.props.loading}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} type="email" placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input type="password" prefix={<Icon type="unlock" style={{ fontSize: 13 }} />} placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
          <p>Not a member ? <a href="/#/register">Register</a> </p>

          </Spin>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
