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
import { fetchCourses } from '../../actions/home'
import styles from "./styles"

@connect((store) => {
  console.log(store);
  return {
    courses : store.home.courses
  };
})

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }
  
  add = () => {
    console.log("add campaign now");
  }

  openCourse(id){
    console.log("open course");
    this.props.router.push("/course/"+id);
  }

  componentWillMount(){
    this.props.dispatch(fetchCourses());
  }

  render() {

    console.log(this.props);

    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <hr className="myhr" />
        <Button type="dashed" onClick={this.add} style={{ width: '60%',margin : '0 20%' }}>
          <Icon type="plus" /> Add Campaign
        </Button>

        <div style={{width : '80%',margin:'0 10%'}}>
          {this.props.courses && this.props.courses.length == 0 && 
            <div style={styles.emptyBox}>
              <h1>Oops! No Courses to show</h1>
            </div>
          }
          <Row gutter={16} style={styles.cardsContainer}>
            {this.props.courses && this.props.courses.length > 0 && this.props.courses.map(course => {
              return (
                <Col key={course._id} style={styles.card} span={8}>
                  <Card 
                  className="c-cards" 
                  bordered = {false}
                  loading={false}
                  onClick = {() => this.openCourse(course._id)}
                  title={
                    <div>
                      <a href="" >{course.name}</a>
                    </div>
                }>
                  <div className="custom-image" 
                  onClick={()=>{this.openCourse(course._id)}} 
                  style={{backgroundImage : `url(${course.t_url})` }}>
                  </div>
                  <div className="custom-card">
                    <h3>{course.desc}</h3>
                    <p>{course.duration}</p>
                  </div>
                  </Card>
                </Col>
              )
            })
            }
          </Row>         
        </div>
      </div>
    );
  }
}

export default Home
