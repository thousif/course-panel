import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import logo from '../../images/new-logo.png';

class Header extends Component {
  render() {
    const { SubMenu } = Menu;
	const { Header, Content, Sider } = Layout;
    return (
	    <Header className="header">
	      <div className="logo" >
	      </div>
	    </Header>
    );
  }
}

export default Header;
