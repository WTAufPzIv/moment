import axios from 'axios'
import {Toast} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css';
import lrz from 'lrz'
const USER = 'USER'
const HOME = 'HOME'
const SET = 'SET'
const ADD = 'ADD'
const BACK = 'BACK'
const POST = 'POST'
const BACK2 = 'BACK2'
const ADDCONTENTSUCCESS = 'ADDCONTENTSUCCESS'
const NICKNAME_EXIST = 'NICKNAME_EXIST'
const UPDATAINFO_SUCCESS = 'UPDATAINFO_SUCCESS'
const GOTOSET = 'GOTOSET'
const BACK3 = 'BACK3'
const initState={
    redirectTo:'',//保存用户跳转信息，指示下一步要跳转到哪
    goto1:false,
    goto2:false,
    goto3:false,
    goto4:false,
    goto5:false,
    username:'',
    usersex:'',
    usertip:'',
    msg:'null'
}

export function HomeAndUser(state = initState,action){
    switch(action.type){
        case USER: 
            return {...state,redirectTo:'/user',goto1:true,goto2:false}
        case HOME:
            return {...state,redirectTo:'/home',goto1:false,goto2:true}
        case SET:
            return {...state,done:true}
        case GOTOSET:
            return {...state,redirectTo:'/changeinfo',goto5:false,goto2:true}
        case ADD:
            return {...state,redirectTo:'/createpost',goto1:true,goto2:false,goto3:false}
        case BACK:
            return {...state,redirectTo:'/home',goto1:false,goto2:true,goto3:true}
        case BACK2:
            return {...state,redirectTo:'/home',goto1:false,goto2:true,goto4:true}
        case POST:
            return {...state,redirectTo:'/post',goto1:true,goto4:false}
        case BACK3:
            return {...state,redirectTo:'/user',goto2:false,goto5:true}
        case ADDCONTENTSUCCESS:
            return {...state,msg:'addcontentsuccess'}
        case NICKNAME_EXIST:
            return {...state,msg:'nickname_exist',done:false}
        case UPDATAINFO_SUCCESS:
            return {...state,msg:'updatainfo_success',done:true}
        default:
            return {...state,redirectTo:'/home',msg:'null'}
    }
}
export function pageChange1() {
    return dispatch=>{
        dispatch({type:USER})
    }
}
export function pageChange2() {
    return dispatch=>{
        dispatch({type:HOME})
    }
}
export function gotosetUserinfo() {
    return dispatch=>{
        dispatch({type:GOTOSET})
    }
}
export function CHtoUser(){
    return dispatch=>{
        dispatch({type:BACK3})
    }
}
export function setUserinfo(data) {
    let flag = 0
    let url = ''
    console.log(data)
    let file1
        let param2 = new FormData()
        let config1 = {
            headers: {'Content-Type': 'multipart/form-data'}
          }
    return dispatch=>{
        if(data.userimageurl[0].file.size >=70*1024){
            let size = 70/((data.userimageurl[0].file.size)/1024)
            lrz(data.userimageurl[0].file,{quality:size,fieldName:'multipartFile'})
            .then(res=>{
                console.log(res.file)
                console.log('why')
                //file1 = res.file
                //param2.append('multipartFile',file1) 
                //console.log(file1)
                axios.post('/officialAccounts/user/uploadFile.do',res.formData,config1)
            .then(response => {
                //console.log("222222");
                if (response.data.status === 0) {
                    flag++
                    url += ''
                    url += response.data.data
                    //console.log(response.data.data);
                }
                console.log(response.data.data)
              })
            })
        }
        else if(data.userimageurl[0].file.size < 70*1024){
            file1 = data.userimageurl[0].file
            param2.append('multipartFile',file1) 
            axios.post('/officialAccounts/user/uploadFile.do',param2,config1)
            .then(response => {
                //console.log("222222");
                if (response.data.status === 0) {
                    flag++
                    url += ''
                    url += response.data.data
                    //console.log(response.data.data);
                }
                console.log(response.data.data)
              })
        }
        console.log(file1)


          setTimeout(()=>{
            console.log(url)
              console.log(flag)
            let param2 = new FormData()
            param2.append('nickname', data.username)
            param2.append('signature', data.usertip)
            param2.append('sex', data.usersex)
            param2.append('userimageurl', url)
            axios.get(('/officialAccounts/user/updateInfo.do?nickname='+data.nickname+'&signature='+data.signature+'&sex='+data.sex+'&userimageurl='+url))
            .then(response => {
                if (response.data.status === 0) {
                    if(flag === 1){
                        dispatch({type:UPDATAINFO_SUCCESS})
                    }
                    //console.log(response.data.data);
                }
                else if(response.data.status === 1003){
                    dispatch({type:NICKNAME_EXIST})
                }
                console.log(response.data)
              })
          },1000)
    }
}
export function add() {
    return dispatch=>{
        dispatch({type:ADD})
    }
}
export function post(val) {
    return dispatch=>{
        dispatch({type:POST})
    }
}
export function addTOuser() {
    return dispatch=>{
        dispatch({type:BACK})
    }
}
export function postToUser() {
    return dispatch=>{
        dispatch({type:BACK2})
    }
}
export function addContent(data) {
    return dispatch=>{
        //上传文章
        let flag = 1;
        let textid = 0;
        let formdata = new FormData();
        formdata.append('textcontent',data.content)
        axios.post('/officialAccounts/text/publish.do',formdata)
        .then(res=>{
            console.log(res.data.data)
            if(res.status===200&&res.data.status === 0){
                flag++;
                textid += res.data.data.textId;
            }
        }
        )


        //上传图片
        if(data.files.length > 0){
            let time1 = data.files.length*1000
            console.log(data);
            let dataarr = new Array()
            let i
            let config = {
                headers: {'Content-Type': 'multipart/form-data'}
                };
            setTimeout(()=>{
                for(i = 0; i < data.files.length; i++){
                    console.log(i)
                    let param = new FormData();
                    if(data.files[i].file.size > 204800 && data.files[i].file.type !== 'image/gif'){
                        //压缩图片，最大500kb
                        let size = 500/((data.files[i].file.size)/1024)
                        lrz(data.files[i].file,{quality:size,fieldName:'multipartFile'})
            .then(res=>{
                param.append('multipartFile',res.file);
                param.append('textId',textid);
                dataarr[i] = param;
                //res.formData.append('textId',textid)
                axios.post('officialAccounts/text/uploadFile.do',dataarr[i],config)
                .then(response => {
                if (response.data.status !== 0) {
                    flag = 0
                    console.log(response.data)
                }
              })
            })
                    }
                    else if(data.files[i].file.size<=204800 || data.files[i].file.type === 'image/gif'){
                        param.append('multipartFile',data.files[i].file);
                    console.log(data.files[i].file)
                    param.append('textId',textid);
                    dataarr[i] = param;
                    axios.post('/officialAccounts/text/uploadFile.do',dataarr[i],config)
                    .then(response=>{
                        console.log(response)
                        console.log(response.data)
                        if (response.data.status !== 0) {
                            flag = 0
                            console.log(response.data)
                        }
                    })
                    }
                }
            },1000)
                setTimeout(()=>{
                    console.log('flag:'+flag)
                    if(flag === 2){
                        // dispatch({type:ADDCONTENTSUCCESS})
                       
                            Toast.success('发布成功 !!!', 1)
                                window.location.href='http://fv215b183.cn/home';
                            console.log('耗时'+time1)
                        
                    }
                },time1+1000);
        }
        else if(data.files.length === 0){
            setTimeout(()=>{
                if(flag === 2){
                    
                    Toast.success('发布成功 !!!', 1)
                    window.location.href='http://fv215b183.cn/home';
                }
            },1000)
        }
    }
}
