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
import { fetchChapter, fetchQuizzes, fetchLectures, addTopic, updateCurriculum } from '../../actions/chapter'
import styles from "./styles"
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;

@connect((store) => {
  console.log(store);
  return {
    chapter : store.chapter.chapter,
    quizList  : store.chapter.quizList,
    lectureList : store.chapter.lectureList,
    status : store.chapter.status
  };
})

class Chapter extends Component {

  constructor(props){
    super(props);
    this.state = {
      previewAddModal : false,
      type : null
    }
  }

  componentWillMount(){
    console.log("dispatch");
    this.props.dispatch(fetchChapter(this.props.params.cid,this.props.params.ch_id));
    this.props.dispatch(fetchQuizzes(this.props.params.cid));
    this.props.dispatch(fetchLectures(this.props.params.cid));
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.status !== this.props.status){
      if(nextProps.status.update){
        this.props.dispatch(fetchChapter(this.props.params.cid,this.props.params.ch_id));
      }
    }
  }

  openAddModal = () => {
    this.setState({previewAddModal : true})
  }

  closeAddModal = () => {
    this.setState({previewAddModal : false})
  }

  handleTypeChange = (type) => {
    this.setState({type});
  }

  addTopic = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if(!err) { 
        console.log(values);
        this.props.dispatch(addTopic({
          cid : this.props.params.cid,
          ch_id : this.props.params.ch_id,
          type : values.type,
          tid : (values.type == 1) ? values.qid : values.lid
        }))
        this.setState({
          previewAddModal : false
        })
        this.props.form.resetFields();
      }
    })
  }

  deleteTopic = (topic) => {
    console.log(topic);
    let self = this;
    confirm({
      title: 'Do you want to delete this Topic ?',
      content: 'This will delete the topic ',
      onOk() {
        let { curriculum } = self.props.chapter.chapter
        let final = curriculum.filter(tpc => tpc.id !== topic);
        self.props.dispatch(updateCurriculum({
            cid : self.props.params.cid,
            ch_id : self.props.params.ch_id,
            cur : final
          })
        )
      },
      onCancel() {},
    });
  }

  render() {

    console.log(this.props);
    const { previewAddModal } = this.state;
    const { chapter } = this.props.chapter;
    let quiz_all = this.props.chapter.quiz_all || [];
    let lec_all = this.props.chapter.lec_all || [];
    const { getFieldDecorator } = this.props.form;
    return (
    	<div>
        <Breadcrumb style={{ margin: '12px' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Course</Breadcrumb.Item>
          <Breadcrumb.Item>Chapter</Breadcrumb.Item>
        </Breadcrumb>
        <hr className="myhr" />
        <div style={{width : '90%',margin:'0 auto'}}>
          {chapter &&
          <Row > 
            <Col span={18} > 
              <div style={{marginLeft : 10}}>
                <h1>{ chapter.nm }</h1>
                <p>{ chapter.dsc }</p>
              </div>         
            </Col>
          </Row>
          }
          <div style={{ marginTop : 50 }}>
            <Row>
            {chapter && chapter.curriculum && chapter.curriculum.length > 0 && chapter.curriculum.map(topic => 
              <Col key={topic.id} style={{ marginBottom : 20 }} span={24}>
                {topic.type == 1 &&
                  <Card extra={<a onClick={() => {this.deleteTopic(topic.id)}} style={{marginLeft : 4}}>Delete</a>} title={quiz_all[topic.id].nm} >
                    <p>{quiz_all[topic.id].dsc}</p>
                  </Card>
                }
                {topic.type == 2 &&
                  <Card  title={lec_all[topic.id].nm} extra={<a onClick={() => {this.deleteTopic(topic.id)}} style={{marginLeft : 4}}>Delete</a>} >
                    <p>{lec_all[topic.id].dsc}</p>
                  </Card>
                }
                
              </Col>
            )}
            <Button type="dashed" onClick={this.openAddModal} style={{ width: '60%',margin : '40px 20%' }}>
              <Icon type="plus" /> Add Topic
            </Button>
            </Row>
          </div>
          <Modal 
            visible={previewAddModal} 
            onCancel={this.closeAddModal}
            onOk = {this.addTopic} >
              <Form layout="vertical">
                <FormItem label="Select type of topic">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'Please select the type of topic' }],
                  })(
                    <Select onChange={this.handleTypeChange}>
                      <Option value="1">Quiz</Option>
                      <Option value="2">Lecture</Option>
                    </Select>
                  )}
                </FormItem>
                { this.state.type == 1 &&
                  <FormItem label="Select Quiz">
                    {getFieldDecorator('qid', {
                      rules: [{ required: true, message: 'Please Select a topic !' }],
                    })(
                      <Select>
                        {this.props.quizList && this.props.quizList.length > 0 &&
                          this.props.quizList.filter(quiz => !!!quiz_all[quiz._id]).map(quiz =>
                            <Option key={quiz._id} value={quiz._id}>{quiz.nm}</Option>
                          )
                        }
                      </Select>
                    )}
                  </FormItem>  
                }
                { this.state.type == 2 &&
                  <FormItem label="Select Lecture">
                    {getFieldDecorator('lid', {
                      rules: [{ required: true, message: 'Please Select a topic !' }],
                    })(
                      <Select>
                        {this.props.lectureList && this.props.lectureList.length > 0 &&
                          this.props.lectureList.filter(lecture => !lec_all[lecture._id]).map(lecture =>
                            <Option key={lecture._id} value={lecture._id}>{lecture.nm}</Option>
                          )
                        }
                      </Select>
                    )}
                  </FormItem>  
                }
              </Form>
            </Modal>
        </div>
      </div>
    );
  }
}

const chapterWrapper = Form.create()(Chapter);

export default chapterWrapper;
