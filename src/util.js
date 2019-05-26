export function getRedirectPath({type,avatar}){
    console.log(type)
    console.log(avatar)
    let url = (type === 'userinfo')?'/userinfo':'/home'
    if(!avatar){
        url += 'info'
    }
    return url
}