import React, { Component } from 'react'
import { 
  Form, 
  Input, 
  Spin, 
  Layout, 
  Tooltip, 
  Collapse, 
  Breadcrumb,
  Menu, 
  Icon, 
  DatePicker, 
  Select, 
  Row, 
  Col, 
  Card,
  Checkbox, 
  Button} from 'antd'
import { IndexLink, Link } from "react-router"
import { connect } from 'react-redux'
import moment from "moment"
import { fetchCourse } from '../../actions/course'
import styles from "./styles"

@connect((store) => {
  console.log(store);
  return {
    course : store.course.course
  };
})

class Course extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    console.log("dispatch");
    this.props.dispatch(fetchCourse(this.props.params.cid));
  }

  render() {

    console.log(this.props);

    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
        </Breadcrumb>
        <hr className="myhr" />
        <div style={{width : '90%',margin:'0 10%'}}>
          <Row > 
            <Col span={6} >
              <div className = "course-thumb-container">
                <img style={{maxWidth : '100%'}} src={this.props.course.t_url} />
              </div>
            </Col>
            <Col span={18} > 
              <div style={{marginLeft : 10}}>
                <h1>{this.props.course.name}</h1>
                <p>{this.props.course.desc}</p>
              </div>         
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Course
