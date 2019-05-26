import React from 'react'
import axios from 'axios'
import {  WingBlank, ListView,NavBar, Icon,Popover, Modal, Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { postToUser } from '../../redux/home.redux'
const Item = Popover.Item;
const prompt = Modal.prompt
const myImg = src => <img src={require('./img/删除.png')} className="am-icon am-icon-xs" alt="" />;
const myImg1 = src => <img src={require('./img/拉黑.png')} className="am-icon am-icon-xs" alt="" />;
  const NUM_ROWS = 20;
  let pageIndex = 0;
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
    { postToUser }
  )
class Post extends React.Component{
    constructor(props){
        super(props)
        function getQueryString(name) {  
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
          var r = window.location.search.substr(1).match(reg);  
          if (r != null) return unescape(r[2]);  
          return null;  
      }  
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
    this.state = {
        dataSource,
        isLoading: true,
        visible: false,
        commentData:[],
        id:getQueryString('textId'),
        authorNickname:'',
        content:'',
        createTime:'',
        file:[],
        nicknameimgurl:'',
        voteOrno:'false',
        openid:getQueryString('openid'),
        authoropenid:'',
        votenum:0
    };
    }
    // adminM(){
    //   if(this.state.openid = 'admin')
    // }
    goBack(){
          this.props.postToUser(); 
    }
    
      componentDidUpdate() {
        if (this.state.useBodyScroll) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'auto';
        }
      }
      componentDidMount() {
        //simulate img loading
        axios.get(('/officialAccounts/text/detailOfOneText.do?textId='+this.state.id))
        .then(res=>{
          if(res.data.status === 0){
            this.setState({authorNickname:res.data.data.authorNickName})
            this.setState({nicknameimgurl:res.data.data.authorImageUrl})
            this.setState({createTime:res.data.data.createTime})
            this.setState({content:res.data.data.content})
            this.setState({file:res.data.data.imagesVoList})
            this.setState({commentData:res.data.data.commentVoList})
            this.setState({authoropenid:res.data.data.openId})
            this.setState({votenum:res.data.data.prasieNumber})
            if(res.data.data.status === 0){
              this.setState({voteOrno:'false'})
            }
            else{
              this.setState({voteOrno:'true'})
            }
            console.log(res.data.data)
            console.log(this.state)
          }
        })

       setTimeout(() => {
           this.rData = genData();
           this.setState({
             dataSource: this.state.dataSource.cloneWithRows(genData()),
             isLoading: false,
             refreshing: false,
           });
         }, 1500);
        }
      
    render(){
        if(this.props.goto4 === true){
            return (<Redirect to={this.props.redirectTo}></Redirect>)
        }
        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                // backgroundColor: '#F5F5F9',
                // height: 8,
                // borderTop: '1px solid #ECECED',
                 borderBottom: '5px solid #ECECED',
              }}
            />
          );
          let index = this.state.commentData.length - 1;
          const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
              index = this.state.commentData.length - 1;
            }
             let obj 
              obj=this.state.commentData[index--];
              if(this.state.commentData.length > 0){
        return (
            <div key={rowID} style={{ padding: '5px 15px 0px 20px' }}>
              <div style = {{height:'50px'}}>
                <div style = {{height:'50px',width:'50px',borderRadius:'200px',overflow:'hidden'}}><img alt = '' src = {obj.commenterImageUrl} style = {{height:'50px',width:'50px'}}/></div>
                <span style = {{color:'rgb(0,0,0)', fontSize:'14px',position:'relative',marginLeft:'70px',top:'-45px'}}>{obj.commenterNickName}</span>
              </div>
              <div style = {{height:'auto',fontSize:'16px', color:'rgb(0,0,0)',position:'relative',top:'-20px',marginLeft:"75px"}}><span>{obj.comments}</span></div>
            </div>
            //<div></div>
          );}
          else if(this.state.commentData.length === 0){
            return null
          }
        };
        let flag
        if(this.state.openid === this.state.authoropenid){
          flag = [
            (<div onClick={()=>{
              axios.get('/officialAccounts/text/delete.do?textId='+this.state.id)
              .then(res=>{
                console.log(res.data)
                if(res.data.status === 0){
                  Toast.success('已删除')
                  setTimeout(()=>{
                    window.location.href='http://fv215b183.cn/home';
                  },500)
                }
                else if(res.data.status === 1009){
                  Toast.fail('无法删除别人的文章')
                }
              })
            }}><Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">删除动态</Item></div>),
          ]
        }
        else if(this.state.openid === 'admin'){
          flag = [
            (<div onClick={()=>{
              axios.get('/officialAccounts/textAdmin/delete.do?textId='+this.state.id)
              .then(res=>{
                console.log(res.data)
                if(res.data.status === 0){
                  Toast.success('已删除')
                  setTimeout(()=>{
                    window.location.href='http://fv215b183.cn/home';
                  },500)
                }
              })
            }}><Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">删除动态</Item></div>),
            (<div onClick={()=>{
              axios.get('/officialAccounts/admin/setBlack.do?openId='+this.state.openid)
              .then(res=>{
                console.log(res.data)
                if(res.data.status === 0){
                  Toast.success('已禁言')
                }
                else if(res.data.status === 1008){
                  Toast.fail('不是管理员无法进行该操作')
                }
                else if(res.data.status === 1009){
                  Toast.fail('该用户已在黑名单中')
                }
              })
            }}><Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">禁言</Item></div>),
          ]
        }
        else{
          flag = [
            (<div><Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">帖子详情</Item></div>),
          ]
        }
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.goBack()}}
                rightContent = {
                <Popover mask
                  overlayClassName="fortest"
                  overlayStyle={{ color: 'currentColor' }}
                  visible={this.state.visible}
                  overlay={flag}
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-10, 0],
                  }}
                  onVisibleChange={this.handleVisibleChange}
                  onSelect={this.onSelect}
                >
                  <div style={{
                    height: '100%',
                    padding: '0 15px',
                    marginRight: '-15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  >
                    <Icon type="ellipsis" />
                  </div>
       </Popover>
       }
                >动态详情</NavBar>
                <WingBlank/><WingBlank/><WingBlank/>
                <div style = {{padding:'20px',background:'white',position:'relative', top:'10px'}}>
                    <div style = {{height:'64px',width:'64px',borderRadius:'200px',overflow:'hidden'}}>
                        <img alt = '' src = {this.state.nicknameimgurl} style = {{height:'64px',width:'64px'}}/></div>
                        <div style = {{color:'rgb(0,0,0)', fontSize:'17px',position:'relative',marginLeft:'85px',top:'-55px'}}>{this.state.authorNickname}</div>
                        <span style = {{color:'rgb(136,136,136)', fontSize:'13px',position:'relative',marginLeft:'85px',top:'-50px'}}>发布时间:{this.state.createTime}</span>
                    <p style = {{position:'relative',top:'-35px'}}>{this.state.content}</p>
                    <div>
                    {
        this.state.file.map(i => (
                    <div style = {{width:'100%'}}>
                      <img alt = '' src = {i.url} style = {{width:'100%'}}/>
                    </div>
                ))
        }
        </div>
                </div>
                <div style = {{height:'25px',width:'100%',marginTop:'11px',background:'white'}}>
                    <div style = {{width:'50%',textAlign:'center'}} onClick = {()=>{
                      prompt('评论', '一定要理性发言哦',
                      [
                        {
                          text: '取消',
                          onPress: value => new Promise((resolve) => {
                            setTimeout(() => {
                              resolve();
                              console.log(`value:${value}`);
                            }, 0);
                          }),
                        },
                        {
                          text: '提交',
                          onPress: value => new Promise((resolve, reject) => {
                            //Toast.info('onPress promise reject', 1);
                            setTimeout(() => {
                              reject();
                              console.log(`value:${value}`);
                              let formData = new FormData()
                              formData.append('textId',this.state.id)
                              formData.append('commentContent',value)
                              axios.post('/officialAccounts/text/comments.do',formData)
                              .then(res=>{
                                if(res.data.status === 0){
                                  axios.get(('/officialAccounts/text/detailOfOneText.do?textId='+this.state.id))
                                  .then(res=>{
                                  if(res.data.status === 0){
                                  this.setState({commentData:res.data.data.commentVoList})
                                  console.log(res.data.data)
                                }
                              })
                              setTimeout(()=>{
                                Toast.success('评论成功')
                                window.location.reload()
                              },1000)
                                }
                                else if(res.data.status === 1006){
                                  Toast.fail('你已被管理员禁言')
                                }
                              })
                            }, 0);
                          }),
                        },
                      ], 'android', null, [''])
                    }}><img alt = '' src = {require('../img/评论.png')} style = {{height:'18px',position:'relative', top:'3px'}}/></div>
                    <div style = {{width:'50%',textAlign:'center',position:'relative',marginLeft:'50%',top:'-20px'}} onClick = {()=>{
                      axios.get(('/officialAccounts/text/praise.do?textId='+this.state.id))
          .then(res=>{
            if(res.data.status === 0){
              //this.setState({voteOrno:'true'})
              axios.get(('/officialAccounts/text/detailOfOneText.do?textId='+this.state.id))
              .then(res=>{
                this.setState({votenum:res.data.data.prasieNumber})
              })
              this.setState({voteOrno:'true'})
              Toast.success('点赞成功')
            }
            else if(res.data.status === 1007){
              this.setState({voteOrno:'true'})
              Toast.fail('你已经点过赞了')
            }
          })}}><img alt = '' src = {require('../img/'+this.state.voteOrno+'.png')} style = {{height:'20px',position:'relative', top:'1px'}}/><span style = {{color:'rgb(138,138,138)',position:'relative',top:'-3px',marginLeft:'10px'}}>{this.state.votenum}</span></div>
                </div>
                <div>
                    <ListView 
                    renderHeader={() => <span>评论列表</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? '加载中...' : '到底了'}
                    </div>)}
                    dataSource = {this.state.dataSource}
                    renderRow={row}
                    renderSeparator={separator}
                    useBodyScroll={true}
                    style={this.state.useBodyScroll ? {} : {
                    height: this.state.height,
                    border: '1px solid #ddd',
                    margin: '5px 0',
                    }}
                    //onEndReached={this.onEndReached}
                    pageSize={0}
                    initialListSize = {this.state.commentData.length}
                    />
                </div>
            </div>
        )
    }
}
export default Post