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
  Modal, 
  Col, 
  Card,
  Checkbox, 
  Button} from 'antd'
import { IndexLink, Link } from "react-router"
import { connect } from 'react-redux'
import moment from "moment"
import { fetchCourse , editChapter, addChapter, deleteChapter } from '../../actions/course'
import styles from "./styles"
const FormItem = Form.Item;
const confirm = Modal.confirm;

@connect((store) => {
  console.log(store);
  return {
    course : store.course.course,
    status : store.course.status
  };
})

class Course extends Component {

  constructor(props){
    super(props);
    this.state = {
      previewEditModal : {
        status : false,
        chapter : {}
      },
      previewAddModal : false
    }
  }

  componentWillMount(){
    console.log("dispatch");
    this.props.dispatch(fetchCourse(this.props.params.cid));
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.status !== this.props.status){
      if(nextProps.status.update){
        this.props.dispatch(fetchCourse(this.props.params.cid));
      }
    }
  }

  openEditModal = (chapter) => {
    console.log("Editing");
    this.setState({
      previewEditModal : {
        status : true,
        chapter
      }
    })
  }

  closeEditModal = () => { 
    this.setState({
      previewEditModal : {
        status : false,
        chapter : {}
      }
    }) 
  }

  editChapter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch(editChapter({
          ...values,
          cid : this.props.params.cid,
          ch_id : this.state.previewEditModal.chapter._id
        }));
        this.setState({
          previewEditModal : {
            status : false,
            chapter : {}
          }          
        })
        this.props.form.resetFields();
      }
    });
  }

  openAddModal = () => {
    this.setState({previewAddModal : true})
  }

  closeAddModal = () => {
    this.setState({previewAddModal : false})
  }

  addChapter = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err) { 
        console.log(values);
        this.props.dispatch(addChapter({
          ...values,
          cid : this.props.params.cid
        }));
        this.setState({
          previewAddModal : false
        })
        this.props.form.resetFields();
      }
    })
  }

  openChapter = (id) => {
    if(!id) return
    console.log("opening chapter with id :", id);
    this.props.router.push('/chapter/'+this.props.params.cid+'/'+id);
  }

  deleteChapter = (chapter) => {
    let self = this;
    confirm({
      title: 'Do you want to delete this Chapter ?',
      content: 'This will delete the chapter ' + chapter.nm,
      onOk() {
        self.props.dispatch(deleteChapter({
          cid : self.props.course.basic._id,
          ch_id : chapter._id
        }))
      },
      onCancel() {},
    });
  }

  render() {

    console.log(this.props);
    const { previewEditModal,previewAddModal } = this.state;
    const { course } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
        </Breadcrumb>
        <hr className="myhr" />
        <div style={{width : '90%',margin:'0 auto'}}>
          {course.basic &&
          <Row > 
            <Col span={6} >
              <div className = "course-thumb-container">
                <img style={{maxWidth : '100%'}} src={course.basic.t_url} />
              </div>
            </Col>
            <Col span={18} > 
              <div style={{marginLeft : 10}}>
                <h1>{ course.basic.name }</h1>
                <p>{ course.basic.desc }</p>
              </div>         
            </Col>
          </Row>
          }
          <div style={{ marginTop : 50 }}>
            <Row>
            {course.curriculum && course.curriculum.length > 0 && course.curriculum.map(chapter => 
              <Col key={chapter._id} style={{ marginBottom : 20 }} span={24}>
                <Card title={<a onClick={()=>{this.openChapter(chapter._id)}} >{chapter.nm}</a>} extra={
                    <div>
                      <a onClick={() => {this.openEditModal(chapter)}}>Edit</a>
                      <a onClick={() => {this.deleteChapter(chapter)}} style={{marginLeft : 4}}>Delete</a>
                    </div>
                  } >
                  <p>{chapter.dsc}</p>
                </Card>
              </Col>
            )}
            <Button type="dashed" onClick={this.openAddModal} style={{ width: '60%',margin : '40px 20%' }}>
              <Icon type="plus" /> Add Chapter
            </Button>
            </Row>
          </div>
          <Modal 
            visible={previewEditModal.status} 
            onCancel={this.closeEditModal}
            onOk = {this.editChapter} >
              <Form layout="vertical">
                <FormItem label="name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input the name of chapter' }],
                    initialValue : previewEditModal.chapter.nm
                  })(
                    <Input  />
                  )}
                </FormItem>
                <FormItem label="Description">
                  {getFieldDecorator('dsc', {
                    rules: [{ required: true, message: 'Please input the description !' }],
                    initialValue : previewEditModal.chapter.dsc
                  })(
                    <Input />
                  )}
                </FormItem>
              </Form>
            </Modal>
            <Modal 
            visible={previewAddModal} 
            onCancel={this.closeAddModal}
            onOk = {this.addChapter} >
              <Form layout="vertical">
                <FormItem label="name">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input the name of chapter' }],
                  })(
                    <Input  />
                  )}
                </FormItem>
                <FormItem label="Description">
                  {getFieldDecorator('dsc', {
                    rules: [{ required: true, message: 'Please input the description !' }],
                  })(
                    <Input />
                  )}
                </FormItem>
              </Form>
            </Modal>
        </div>
      </div>
    );
  }
}

const courseWrapper = Form.create()(Course);

export default courseWrapper;
