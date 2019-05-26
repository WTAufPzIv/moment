import React from 'react'
import { Login,adminLogin } from '../../redux/userinfo.redux'
import {connect} from 'react-redux'
import { Card, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
@connect(
    state =>state.user,
    { Login,adminLogin }
)
class Userinfo extends React.Component{
    constructor(props){
        super(props)
        function getQueryString(name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = window.location.search.substr(1).match(reg);  
            if (r != null) return unescape(r[2]);  
            return null;  
        }  
        console.log(getQueryString('openid'));
        this.state = {
           openid:getQueryString('openid')
        }
    }
    // login(){
    //     const info = this.state;
    //     console.log(info)
    //     this.props.Login(info);
    //         if(this.props.msg === 'needRegister'){
    //             window.location.href='http://fv215b183.cn/userinfo'
    //         }
    //         else if(this.props.msg === 'canLogin'){
    //             window.location.href='http://fv215b183.cn/home'
    //         }
    // }
    render(){
        return(
            <div>
                <div>
                <WhiteSpace size="lg" />
                <Card full>
                <Card.Header
                    title="武科大人协"
                    thumb={require('./img/wust.png')}
                    thumbStyle = {{height:'60px',width:'60px'}}
                    extra={<span>验证用户</span>}
                />
                <Card.Body>
                    <div>技术支持:</div>
                    <br />
                    <img alt = '' src = {require('./img/logo.png')} style = {{height:'40px',width:'40px',textAlign:'center',position:'relative',marginLeft:'45%'}}/>
                    <br/><br/>
                    <span style = {{fontSize:'15px',color:'rgb(186,186,186)',position:'relative',marginLeft:'3%'}}>武汉科技大学计算机科学与技术学院 | 领航工作室</span>
                </Card.Body>
                </Card>
            </div>
            <WingBlank>
            <Button type = 'primary' onClick = {()=>{
                const info = this.state;
                console.log(info);
                this.props.Login(info);
                //console.log(this.props);
                setTimeout(()=>{
                  console.log(this.props);
                    if(this.props.msg === 'needRegister'){
                        window.location.href=('http://fv215b183.cn/userinfo?openid='+this.state.openid)
                    }
                    else if(this.props.msg === 'canLogin'){
                        window.location.href='http://fv215b183.cn/home'
                    }
                },1000);
            }}>验证并进入</Button>
            </WingBlank>
            <span style = {{color:'rgb(186,186,186)',fontSize:'15px',position:'relative',marginLeft:"310px",top:'25px'}} onClick = {()=>{
                let password=prompt('请输入你的昵称')
                const info = this.state;
                console.log(info)
                if(password !== null){
                this.props.adminLogin(info.openid,password);
                
                //console.log(this.props);
                setTimeout(()=>{
                  console.log(this.props);
                    if(this.props.msg === 'canLogin'){
                        window.location.href='http://fv215b183.cn/home'
                    }
                    else if(this.props.msg === 'pwderror'){
                        alert('该用户不是管理员')
                    }
                },1000);
            }
            }}>管理员登录</span>
            </div>
        )
    }
}
export default Userinfo