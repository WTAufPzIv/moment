import React from 'react'
import {  Toast,NavBar, Icon, TextareaItem, WhiteSpace, List, ImagePicker, Button, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addTOuser,addContent  } from '../../redux/home.redux'
import './add.css'
@connect(
    state =>state.HomeAndUser,
    { addTOuser,addContent }
  )
class Add extends React.Component{
    constructor(props){
        super(props)
    this.Submit = this.Submit.bind(this)
    this.state = {
        content:'',
        files:[]
    }
    
    }
    Submit(){
        //const info = this.state
        this.props.addContent(this.state);
        console.log(this.state)
        // setTimeout(()=>{
        //     if(this.props.msg === 'addcontentsuccess'){
        //         Toast.success('发布成功 !!!', 1)
        //             window.location.href='http://fv215b183.cn/home';
                
        //     }
        //     // else if(this.props.state.user.done === true){
        //     //     alert("保存成功！！！");
        //     //     window.location.href='http://fv215b183.cn/home'
        //     // }
        // },3000);
    }
    // componentDidUpdate(){
    //     if(this.props.msg === 'addcontentsuccess'){
    //         Toast.success('发布成功 !!!', 1)
    //             window.location.href='http://fv215b183.cn/home';
    //     }
        
    // }
    ImgonChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    goback(){
        console.log('回去喽')
        this.props.addTOuser();
    }
    render(){
        if(this.props.goto3 === true){
            return (<Redirect to={this.props.redirectTo}></Redirect>)
        }
        //const { files } = this.state;
        return(
            <div>
            <NavBar
            mode = 'light'
            icon={<Icon type="left" />}
            onLeftClick={() => this.goback()}
            >发布动态</NavBar>
            {/* <WhiteSpace /><WhiteSpace /> */}
            <List renderHeader={() => ''}>
            <TextareaItem
            placeholder="在这里,有趣的灵魂不设防...(若上传的图片体积过大,请耐心等待跳转,若长时间无响应请手动返回)"
            rows = '7'
            min-height = '100px'
            onChange = {(v)=>this.onChange('content',v)}
          />
           <ImagePicker
                files={ this.state.files }
                onChange={this.ImgonChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.files.length < 9}
                accept="image/jpeg,image/jpg,image/png,image/gif"
            />
            <WhiteSpace /><WhiteSpace />
          </List>
          <WhiteSpace /><WhiteSpace />
          <WingBlank><WingBlank><Button className = 'addSubmitButton' onClick = {this.Submit}>发布</Button></WingBlank></WingBlank>
          </div>
        )
    }
}
export default Add