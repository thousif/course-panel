import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { registerUser } from "../../actions/loginActions"
import { Form, Spin,notification, Icon, Input, Button, Checkbox, InputNumber } from 'antd'
const FormItem = Form.Item;

@connect((store) => {
  console.log(store);
  return {
    user: store.login.register,
    loading : store.login.fetching
  };
})

class NormalRegisterForm extends React.Component {

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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(registerUser(values));
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
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} type="text" placeholder="Name" />
            )}
          </FormItem>
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
              Sign up
            </Button>
          </FormItem>
          <p>Already a member ? <a href="/#/login">Login</a> </p>

          </Spin>
        </Form>
      </div>
    );
  }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default WrappedNormalRegisterForm;
