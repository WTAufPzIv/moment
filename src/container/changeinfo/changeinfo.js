import React from 'react'
import axios from 'axios'
import {  Icon,Toast,ImagePicker,NavBar,InputItem,WingBlank,WhiteSpace,List,Radio,TextareaItem,Button } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { setUserinfo,CHtoUser } from '../../redux/home.redux'
import './changeinfo.css'
const  RadioItem = Radio.RadioItem;
@connect(
    state =>state.HomeAndUser,
    { setUserinfo,CHtoUser }
)


class ChangeInfo extends React.Component{
    constructor(props){
        super(props)
        function getQueryString(name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = window.location.search.substr(1).match(reg);  
            if (r != null) return unescape(r[2]);  
            return null;  
        }
        this.state = {
            nickname:'',
            sex:'',
            signature:'',
            userimageurl:[],
            openid:getQueryString('openid')
        }
    }
    goback(){
        this.props.CHtoUser()

    }
    componentDidMount(){
        axios.post('/officialAccounts/user/getInfo.do')
        .then(res=>{
            if(res.data.status === 0){
                this.setState({nickname:res.data.data.nickname})
                this.setState({sex:res.data.data.sex})
                this.setState({signature:res.data.data.signature})
            }
        })
    }
    ImgonChange = (userimageurl, type, index) => {
        console.log(userimageurl, type, index);
        this.setState({
            userimageurl,
        });
      }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    SexChange(val){
        this.setState({
            sex:val
        })
    }
    submit(){
        const info = this.state;
        console.log(info);
        
        if(info.nickname.length > 0 && (info.sex === 'man' || info.sex === 'woman') && info.signature.length !== 0 && info.userimageurl.length > 0 ){
        this.props.setUserinfo(this.state);
        }
        else
        {
        alert("请正确输入信息！");
        console.log('error');
        }
        
        setTimeout(()=>{
            if(this.props.msg === 'nickname_exist'){
                Toast.fail('昵称已存在 !!!', 1);
            }
            else if(this.props.msg === 'updatainfo_success'){
                alert("保存成功！！！");
                window.location.href='http://fv215b183.cn/welcome?openid='+this.state.openid
                //window.location.href='http://fv215b183.cn/user?changestate=true'
            }
        },2000);
    }
    
    render(){
        if(this.props.goto5 === true ){
            return (<Redirect to={this.props.redirectTo}></Redirect>)
        }
        //const { files  }= this.state.userimageurl;
        const data = [
            { usersexValue: 'man', label: '男生' },
            { usersexValue: 'woman', label: '女生' },
          ];
        return(
            <div>
                <NavBar style = {{backgroundColor:'white',color:'black'}} icon={<Icon type="left" />}
                onLeftClick={() => this.goback()}>修改信息</NavBar>
                <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                <WingBlank>
                <InputItem onChange = {(v)=>this.onChange('nickname',v)} value = {this.state.nickname}>昵称</InputItem>
                </WingBlank>
                <WhiteSpace/>
                <WingBlank>
                <List renderHeader={() => '性别'}>
                {data.map(i => (
                    <RadioItem key={i.usersexValue} onChange={() => this.SexChange(i.usersexValue)} checked = {this.state.sex === i.usersexValue}>
                        {i.label}
                        <img src={require('../img/'+i.usersexValue+'.png')} alt="" />
                    </RadioItem>
                ))}
                </List>
                </WingBlank>
                <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                <WingBlank>
                <TextareaItem
                title="签名"
                placeholder="(介绍下自己吧)"
                rows={5}
                count={100}
                onChange = {(v)=>this.onChange('signature',v)}
                value = {this.state.signature}
                />
                </WingBlank>
                <div class = 'headImg'>选择头像</div>
                <WingBlank>
                <ImagePicker
                files={ this.state.userimageurl }
                onChange={this.ImgonChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={this.state.userimageurl.length < 1}
                accept="image/jpeg,image/jpg,image/png"
                />
                {/* <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" onChange={this.ImgonChange} /> */}
                </WingBlank>
                <WhiteSpace/>
                <WingBlank><WingBlank><WingBlank>
                <Button type = 'primary' onClick = {() => this.submit()}>保存信息</Button>
                <WhiteSpace /></WingBlank></WingBlank></WingBlank>
            </div>
        )
    }
}
export default ChangeInfo