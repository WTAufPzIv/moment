import React from 'react'
import axios from 'axios'
import {  List , Carousel, WingBlank,WhiteSpace, ListView } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { pageChange1,add,post } from '../../redux/home.redux'
import '../home/home.css'
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
    { pageChange1,add,post }
  )
class Home extends React.Component{
   constructor(props){
       super(props)
       const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });
      this.initData = [];
      for (let i = 0; i < 20; i++) {
        this.initData.push(`r${i}`);
      }
       this.state = {
           headImgData: ['1', '2', '3','4','5','6'],
           imgHeight: 176,
           postlist:[],
           dataSource,
           isLoading: true,
           refreshing: true,
           height: document.documentElement.clientHeight,
           useBodyScroll: false,
           contentdata:[],
           openid:'',
           length:0
       };
    }
    SegmentedControlchange(){
      console.log(this.props);
      this.props.pageChange1();
      console.log(this.props);
    }
    gototop(){
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        //this.gototop();
           //window.requestAnimationFrame(this.gototop());
           window.scrollTo (0,0); 
      }
    }
   componentDidMount() {
     //simulate img loading
     axios.get(('/officialAccounts/user/getInfo.do'))
      .then(res=>{
          if(res.data.status === 0){
              this.setState({openid:res.data.data.openid})
              console.log(res.data.data)
          }
      }
      )
     axios.post(('/officialAccounts/text/detailOfAllText.do'))
     .then(res=>{
       if(res.status === 200 && res.data.status === 0){
        console.log(res.data.data)
        this.setState({contentdata:res.data.data})
        console.log(this.state.contentdata)
       }
     })
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI']
      });
    }, 100);
     // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);
    // simulate initial Ajax
    setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(genData()),
          isLoading: false,
          refreshing: false,
        });
      }, 100);
      // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }
    }
    componentDidUpdate() {
      if (this.state.useBodyScroll) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.rData = { ...this.rData, ...genData(++pageIndex) };
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            isLoading: false,
          });
        }, 100);
      }
      onRefresh = () => {
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
          this.rData = genData();
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            refreshing: false,
            isLoading: false,
          });
        }, 600);
      };
      onScroll = () => {
        console.log('sss');
      };
      addpost(){
        this.props.add();
      }
      checkPost(val,openid){
        //this.props.post(val);
        window.location.href=('http://fv215b183.cn/post?textId='+val+'&openid='+openid);
      }
    render(){
      if(this.props.goto1 === true){
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
          const data = this.state.contentdata
          let index = 0;
          const row = (rowData, sectionID, rowID) => {
            if (index >= data.length) {
              index = data.length - 1;
            }
            let obj = data[index++];
            // let flag;
            // if(obj.imagesVoList.length !== 0){
            //   flag = obj.content+'      [图片]'*obj.imagesVoList.length
            // }
            // else if(obj.imagesVoList.length === 0){
            //   flag = obj.content
            // }
            if(data.length > 0){
        return (
            <div key={rowID} style={{ padding: '20px 20px 5px 20px' }} onClick = {()=>{this.checkPost(obj.textId,this.state.openid)}}>
              <div style = {{height:'80px'}}>
                <div style = {{height:'64px',width:'64px',borderRadius:'200px',overflow:'hidden'}}><img alt = '' src = {obj.authorImageUrl} style = {{height:'64px',width:'64px'}}/></div>
                <span style = {{color:'rgb(0,0,0)', fontSize:'17px',position:'relative',marginLeft:'85px',top:'-55px'}}>{obj.authorNickName}</span>
                <span style = {{color:'rgb(136,136,136)', fontSize:'13px',position:'relative',marginLeft:'-53px',top:'-33px'}}>发布时间:{obj.createTime}</span>
              </div>
              <div style = {{height:'auto',fontSize:'15px', color:'rgb(0,0,0)',position:'relative',top:'-8px'}}><span>{obj.imagesVoList.length > 0?obj.content+'[图片]':obj.content}</span></div>
              {/* <div style = {{height:'20px',width:'100%',marginTop:'23px'}}>
                <div style = {{width:'50%',textAlign:'center'}}><img alt = '' src = {require('../img/评论.png')} style = {{height:'18px'}}/></div>
                <div style = {{width:'50%',textAlign:'center',position:'relative',marginLeft:'50%',top:'-20px'}}><img alt = '' src = {require('../img/点赞.png')} style = {{height:'18px'}}/></div>
              </div> */}
            </div>
          );}
          else if(data.length === 0){
            return(
              null
            )
          }
        };
        let contentListText = [
          {
            authorImageUrl: this.state.userimageurl,
            username: this.state.username,
            content: '(妈耶，这里什么都没有)',
            createTime:'0000-00-00',
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
              <WhiteSpace/><WhiteSpace/>
                <WingBlank>
                <div class = 'SegmentedStyle'>
                      <div class = 'SegmentedStyle_son2'>生活圈动态</div>
                      <div class = 'SegmentedStyle_son1' onClick = {()=>this.SegmentedControlchange()}>个人主页</div>
                      <div class = 'topStyle' onClick = {()=>this.gototop()}>
                        <img alt = '' src = {require('../img/top.png')} style = {{height:'50px',width:'50px'}}/>
                      </div>
                      <div class = 'addStyle' onClick = {()=>this.addpost()}>
                        <img  alt = '' src = {require('../img/add.png')} style = {{height:'50px',width:'50px'}}/>
                      </div>
                </div>
                </WingBlank>
                
                <WhiteSpace/><WhiteSpace/>
                <div>
                <Carousel className="space-carousel"
                frameOverflow="visible"
                cellSpacing={5}
                slideWidth={0.8}
                autoplay
                infinite = {true}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => this.setState({ slideIndex: index })}
                >
                {this.state.headImgData.map((val, index) => (
                <a
                key={val}
                href="http://www.alipay.com"
                style={{
                display: 'block',
                position: 'relative',
                top: this.state.slideIndex === index ? -10 : 0,
                height: this.state.imgHeight,
                boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
                }}
                >
                <img
                src={require('./img/'+val+'.jpg')}
                alt=""
                style={{ width: '300px', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
                />
                </a>
                ))}
                </Carousel>
                </div>
                {/* <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>下拉可以刷新哦</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '到底了哦'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        //useBodyScroll={this.state.useBodyScroll}
        useBodyScroll={true}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        //onEndReached={this.onEndReached}
        pageSize={0}
        initialListSize = {this.state.contentdata.length}
      /> */}
       <List>
      {
        contentList.map(i =>(
                    <div style={{ padding: '20px 20px 5px 20px',zIndex:'1000',position:'relative'}}>
                      <div style = {{height:'80px'}}  onClick = {()=>{
                      console.log('nidianle')
                      window.location.href=('http://fv215b183.cn/post?textId='+i.textId+'&openid='+this.state.openid);
                      }}>
                        <div style = {{height:'64px',width:'64px',borderRadius:'200px',overflow:'hidden'}}><img alt = '' src = {i.authorImageUrl} style = {{height:'64px',width:'64px'}}/></div>
                        <span style = {{color:'rgb(0,0,0)', fontSize:'15px',position:'relative',marginLeft:'85px',top:'-55px'}}>{i.authorNickName}</span>
                        <span style = {{color:'rgb(136,136,136)', fontSize:'13px',position:'relative',marginLeft:'-50px',top:'-33px'}}>发布时间:{i.createTime}</span>
                      </div>
                      <div style = {{height:'auto',fontSize:'15px', color:'rgb(0,0,0)',position:'relative',top:'-10px'}}  onClick = {()=>{
                      console.log('nidianle')
                      window.location.href=('http://fv215b183.cn/post?textId='+i.textId+'&openid='+this.state.openid);
                      }}><span>{i.content.length === 0?'(无文本内容)':i.content}</span></div>
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
export default Home