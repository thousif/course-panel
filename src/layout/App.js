import React, { Component } from 'react'
import { Button } from 'antd'
import './App.css'
import Header from '../scenes/header/index'
import { connect } from 'react-redux'
import Cookies from 'universal-cookie'
import Sidebar from '../scenes/sidebar/index'
import { logout } from '../actions/loginActions'
import { Layout, Menu, Icon, notification } from 'antd'
const { Sider, Content } = Layout;
const cookies = new Cookies();

@connect((store) => {
  console.log(store);
  return {
    user : store.login.user,
  };
})

class App extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    // if(cookies.get("course_aid") && cookies.get("course_at")){}else{
    //   this.props.router.push("/login");
    // }
  }

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  logout = () => {
    console.log("logging out user");
    this.props.dispatch(logout())
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.logout !== this.props.user.logout){
      this.props.router.push("/login");
    }
    console.log(nextProps);
  }

  componentWillMount(){
    
  }

  render() {
    return (
        <div >
      	<Layout style={{minHeight : '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
    	   <Sidebar logout = {this.logout} />	
        </Sider>
        <Layout>
          {this.props.children}
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default App;
