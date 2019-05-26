//此页面用于管理用户修改信息提交后的状态更新
import axios from 'axios'
import lrz from 'lrz'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const NICKNAME_EXIST = 'NICKNAME_EXIST'
const ALLOWLOGIN = 'ALLOWLOGIN'
const NEEDREGISTER = 'NEEDREGISTER'
const PASSWORDERROE = 'PASSWORDERROE'
const initState={
   msg:'',
   redirectTo:''
}
let flagopenid
export function user(state = initState,action){
    switch(action.type){
        case ERROR_MSG: //失败
            return {redirectTo:'/userinfo',done:false,msg:'error'}
        case AUTH_SUCCESS: //成功并跳转至主页
            return {msg:'success', redirectTo:'home',done:true}
        case NICKNAME_EXIST: //昵称存在
            return {msg:'nickname_exist',done:false}
        case ALLOWLOGIN: //可以登录
            return {msg:'canLogin',done:false}
        case NEEDREGISTER: //需要注册
            return {msg:'needRegister',done:false}
        case PASSWORDERROE: //密码错误
            return {msg:'pwderror',done:false}
        default:
            return state
    }
}
function authSuccess(){
    return {type:AUTH_SUCCESS}
}
function error(){
    return {type:ERROR_MSG}
}
function nickMsg(){
    return {type:NICKNAME_EXIST}
}
function allowLogin(){
    return {type:ALLOWLOGIN}
}
function needRegister(){
    return { type:NEEDREGISTER }
}
function getopenid(openid){
    flagopenid = openid;
}
export function adminLogin(openid,password){
    return dispatch=>{
        let flag = new FormData()
        flag.append('openId',openid)
        flag.append('nickName',password)
        axios.post('/officialAccounts/admin/login.do',flag)
        .then(res=>{
            //console.log(res.data)
            if(res.data.status === 0){
                dispatch(allowLogin())
            }
            else if(res.data.status === 1004){
                dispatch({type:PASSWORDERROE})
            }
        })
    }
}
export function Login(data){
    return dispatch=>{
        axios.get(('/officialAccounts/user/login.do?openId='+data.openid))
        .then(res=>{
            //console.log(res.data)
            if(res.status===200&&res.data.status === 0){
                //console.log('成功了')
                dispatch(allowLogin())
            }
            else if(res.status===200&&res.data.status === 1000){
                dispatch(needRegister())
            }
        }
        )
        getopenid(this.openid)
    }
}

export function update(data) {
    let flag = 0;
    return dispatch=>{
        //console.log(data);
        setTimeout(()=>{
            axios.get(('/officialAccounts/user/register.do?openid='+data.openid+'&nickname='+data.nickname+'&signature='+data.signature+'&sex='+data.sex))
         .then(res=>{
            if(res.status===200&&res.data.status === 0){
                flag++;
            }else if(res.status === 200&&res.data.status === 1003){
                dispatch(nickMsg())
            }
            else{
                dispatch(error())
            }
             //console.log(res.data);
         })
        .catch(function(response){
            //console.log(response);//发生错误时执行的代码
        })
        },0)
        //axios.get(('/officialAccounts/user/login.do?openId='+data.openid))

        //console.log(flagopenid)
        //console.log(data.userimageurl)
        let file
        let size = 50/((data.userimageurl[0].file.size)/1024)
        console.log('大小'+data.userimageurl[0].file.size)
        if(data.userimageurl[0].file.size > 50*1024){
            lrz(data.userimageurl[0].file,{quality:size,fieldName:'multipartFile'})
            .then(res=>{
                 //console.log(param)
                 let config = {
                     headers: {'Content-Type': 'multipart/form-data'}
                   }
                   setTimeout(()=>{
                     axios.post('/officialAccounts/user/uploadFile.do',res.formData,config)
                     .then(response => {
                         //console.log("222222");
                         if (response.data.status === 0) {
                             if(flag === 1){
                                 console.log("666666")
                                 dispatch(authSuccess())
                             }
                             //console.log(response.data.data);
                         }
                         //console.log(response.data)
                       })
                   },500)
            })
        }
        else{
            let asd = new FormData()
            asd.append('multipart',data.userimageurl[0].file)
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
              }
              setTimeout(()=>{
                axios.post('/officialAccounts/user/uploadFile.do',asd,config)
                .then(response => {
                    //console.log("222222");
                    if (response.data.status === 0) {
                        if(flag === 1){
                            dispatch(authSuccess())
                        }
                        //console.log(response.data.data);
                    }
                    //console.log(response.data)
                  })
              },500)
        }
          //console.log(flag)
    }
}
