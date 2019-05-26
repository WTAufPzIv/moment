import React from 'react'
import axios from 'axios'
import {  Toast, WingBlank, Button,WhiteSpace, ListView, List,Result, Modal } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { pageChange2,gotosetUserinfo } from '../../redux/home.redux'
import './user.css'
  const NUM_ROWS = 20;
  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  }
@connect(
    state =>state.HomeAndUser,
    { pageChange2, gotosetUserinfo }
  )
  
class User extends React.Component{
    constructor(props){
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
          this.initData = [];
          for (let i = 0; i < 20; i++) {
            this.initData.push(`r${i}`);
          }
          function getQueryString(name) {  
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
            var r = window.location.search.substr(1).match(reg);  
            if (r != null) return unescape(r[2]);  
            return null;  
        }  
           this.state = {
               headImgData: ['1', '2', '3'],
               imgHeight: 176,
               postlist:[],
               dataSource,
               isLoading: true,
               refreshing: true,
               height: document.documentElement.clientHeight,
               useBodyScroll: false,
               username:'',
               usersex:'man',
               usertip:'',
               files:[],
               userimageurl:'',
               contentdata:[],
               openid:'',
               score:0,
               sign:false,
               signOrnot:'签到领积分',
               flag:'132',
               changestate:getQueryString('changestate')
           }
    }

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
  SexChange(val){
      this.setState({
          usersex:val
      })
  }
  componentWillReceiveProps(){
    axios.get(('/officialAccounts/user/getInfo.do'))
      .then(res=>{
          if(res.data.status === 0){
              this.setState({username:res.data.data.nickname})
              this.setState({usersex:res.data.data.sex})
              this.setState({usertip:res.data.data.signature})
              this.setState({openid:res.data.data.openid})
              this.setState({userimageurl:res.data.data.userimageurl})
              console.log(res.data.data)
          }
      }
      )
      axios.get(('/officialAccounts/text/detailOfOwnText.do'))
      .then(res=>{
        if(res.data.status === 0){
          console.log(res.data.data)
          this.setState({contentdata:res.data.data})
          console.log(this.state.contentdata)
        }
      })
  }
  function(){
    console.log('强制调用')
    axios.get(('/officialAccounts/user/getInfo.do'))
      .then(res=>{
          if(res.data.status === 0){
              this.setState({username:res.data.data.nickname})
              this.setState({usersex:res.data.data.sex})
              this.setState({usertip:res.data.data.signature})
              this.setState({openid:res.data.data.openid})
              this.setState({userimageurl:res.data.data.userimageurl})
              console.log('强制调用')
          }
      }
      )
  }
  componentDidMount() {
      axios.get(('/officialAccounts/user/getInfo.do'))
      .then(res=>{
          if(res.data.status === 0){
              this.setState({username:res.data.data.nickname})
              this.setState({usersex:res.data.data.sex})
              this.setState({usertip:res.data.data.signature})
              this.setState({openid:res.data.data.openid})
              this.setState({userimageurl:res.data.data.userimageurl})
              console.log(res.data.data)
          }
      }
      )
      axios.get(('/officialAccounts/score/myScore.do'))
      .then(res=>{
        if(res.data.status === 0){
          //console.log(res.data)
          this.setState({score:res.data.data})
        }
      })
      axios.get(('/officialAccounts/sign/checkSign.do'))
      .then(res=>{
        if(res.data.status === 0){
          this.setState({signOrnot:'签到领积分'})
          this.setState({sign:false})
        }
        else if(res.data.status === 1){
          this.setState({signOrnot:'今日已签到'})
          this.setState({sign:true})
        }
      })
      axios.get(('/officialAccounts/text/detailOfOwnText.do'))
      .then(res=>{
        if(res.data.status === 0){
          console.log(res.data.data)
          this.setState({contentdata:res.data.data})
          console.log(this.state.contentdata)
        }
      })
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 600);
      }
    SegmentedControlchange(){
        //console.log(this.props);
        this.props.pageChange2();
        //console.log(this.props);
      }
      // componentWillReceiveProps(){
      //   axios.get(('/officialAccounts/user/getInfo.do'))
      // .then(res=>{
      //     if(res.data.status === 0){
      //         this.setState({username:res.data.data.nickname})
      //         this.setState({usersex:res.data.data.sex})
      //         this.setState({usertip:res.data.data.signature})
      //         this.setState({openid:res.data.data.openid})
      //         this.setState({userimageurl:res.data.data.userimageurl})
      //         console.log(res.data.data)
      //     }
      // }
      // )
      // }
      
      onOpenChange(){
        //this.props.gotosetUserinfo();
        // if(this.props.msg === 'updatainfo_success'){
          
           window.location.href = 'http:///changeinfo?openid='+this.state.openid
           this.setState({flag:''})
        // }
      }
      onClose = key => () => {
        axios.get(('/officialAccounts/sign/signIn.do'))
        .then(res=>{
          console.log(res.data)
          if(res.data.status === 0){
            Toast.success('签到成功')
            this.setState({sign:true})
            this.setState({signOrnot:'今日已签到'})
          }
        })
        this.setState({
          [key]: false,
        });
      }
      showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      // onOpenChange = (...args) => {
      //   console.log(args);
      //   this.setState({ open: !this.state.open });
      // }
      // checkPost(val){
      //   //this.props.post(val);
      //   console.log('我要炸了')
      //   window.location.href=('http://fv215b183.cn/post?textId='+val);
      // }
    render(){
        if(this.props.goto2 === true ){
            return (<Redirect to={this.props.redirectTo}></Redirect>)
        }
        if(this.props.msg === 'updatainfo_success'){
          axios.get(('/officialAccounts/user/getInfo.do'))
      .then(res=>{
          if(res.data.status === 0){
              this.setState({username:res.data.data.nickname})
              this.setState({usersex:res.data.data.sex})
              this.setState({usertip:res.data.data.signature})
              this.setState({openid:res.data.data.openid})
              this.setState({userimageurl:res.data.data.userimageurl})
              console.log(res.data.data)
          }
      }
      )
        }
      let contentListText = [
        {
          authorImageUrl: this.state.userimageurl,
          username: this.state.username,
          content: '(你还没有发布过动态，快去发布你的第一条动态吧)',
          createTime:'null',
          textId:1
          //tip:'Jane Eyre'
        },
      ];

      let contentList
      if(this.state.contentdata.length > 0){
        contentList = this.state.contentdata
      }
      else if(this.state.contentdata.length === 0){
        contentList = contentListText
      }
        return (
            <div>
            <WhiteSpace/>
                  <WingBlank>
                  <div class = 'SegmentedStyle'>
                      <div class = 'SegmentedStyle_son1' onClick = {()=>this.SegmentedControlchange()}>生活圈动态</div>
                      <div class = 'SegmentedStyle_son2' >个人主页</div>
                  </div>
                  </WingBlank>
             
                <WhiteSpace/><WhiteSpace/><WhiteSpace/>

                <Result
                style = {{zIndex:'10000'}}
                img = {<img src={this.state.userimageurl} style={{width:'65px',borderRadius:'200px',height:'65px'}} alt="" />}
                title={this.state.username}
                message={<div>
                    {this.state.usertip}
                    <img 
                    alt = '' 
                    src = {require('./img/'+this.state.usersex+'.png')} 
                    style={{width:'30px',borderRadius:'200px',position:'relative',top:'11px'}} 
                    />
                    <Button type = 'ghost' inline size = 'small' 
                    style={{ position:'absolute',left:'10px',top:'145px'}} onClick={this.showModal('modal2')}>签到</Button>
                     <Modal
                        popup
                        visible={this.state.modal2}
                        onClose={this.onClose('modal2')}
                        animationType="slide-up"
                    >
                    <List renderHeader={() => <div>签到领积分</div>} className="popup-list">
                      <List.Item>
                      我的积分:{this.state.score}
                      </List.Item>
                    <List.Item>
                    <Button type="primary" onClick={this.onClose('modal2')}  disabled = {(this.state.sign)?true:false}>{this.state.signOrnot}</Button>
                    </List.Item>
                    </List>
                    </Modal>
                    <Button type = 'ghost' inline size = 'small' 
                    style={{ position:'absolute',right:'10px',top:'145px'}}  onClick = {()=>this.onOpenChange()}>修改</Button>
                    </div>}
                />
      <List>
      {
        contentList.map(i =>(
                    <div style={{ padding: '20px 20px 5px 20px',zIndex:'1000',position:'relative'}}>
                      <div style = {{height:'80px'}}  onClick = {()=>{
                      console.log('nidianle')
                      window.location.href=('http://fv215b183.cn/post?textId='+i.textId+'&openid='+this.state.openid);
                      }}>
                        <div style = {{height:'64px',width:'64px',borderRadius:'200px',overflow:'hidden'}}><img alt = '' src = {i.authorImageUrl} style = {{height:'64px',width:'64px'}}/></div>
                        <span style = {{color:'rgb(0,0,0)', fontSize:'15px',position:'relative',marginLeft:'85px',top:'-55px'}}>{this.state.username}</span>
                        <span style = {{color:'rgb(136,136,136)', fontSize:'13px',position:'relative',marginLeft:'-50px',top:'-33px'}}>发布时间:{i.createTime}</span>
                      </div>
                      <div style = {{height:'auto',fontSize:'15px', color:'rgb(0,0,0)',position:'relative',top:'-10px'}}  onClick = {()=>{
                      console.log('nidianle')
                      window.location.href=('http://fv215b183.cn/post?textId='+i.textId+'&openid='+this.state.openid);
                      }}><span>{i.content}</span></div>
                      <div style = {{height:'5px',background:'rgb(236,236,236)',position:'relative',marginLeft:'-22px',width:'111%'}}></div>
                    </div>
                ))
        }
                <div style = {{background:'rgb(245,245,249)',textAlign:'center',top:'-5px',position:'relative',lineHeight:'44px',height:'360px',color:'rgb(136,136,136)'}}>到底了哦</div>
      </List>
        </div>
        )
    }
}
export default User