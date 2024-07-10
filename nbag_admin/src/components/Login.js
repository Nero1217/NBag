import React,{useContext,useEffect, useState} from 'react'
import axios from 'axios'

import {User} from '../App'
import '../styles/login.css'

function Login() {
  const user = useContext(User)
  const dataObj = useState({
    'block':false
  })
  const checkInput = (e)=>{
    let userInput = e.target.value
    if(userInput > 16){
        e.target.value = userInput.slice(0,16)
    }
    else if((/[\s]/g).test(userInput)){
        e.target.value = userInput.replace(/[\s]/g,'');
    }
  }
  const loginAction = ()=>{
    let flag = false;
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    //#region check empty
    if(username===''){
        alert("Please fill in the username.");
    }else if(password===''){
        alert("Please fill in the password.");
    }
    //#endregion
    //#region 限制長度, 空白鍵
    else if(username.length>16||/[\s]{1,}$/.test(username)
    ||/[^A-z0-9]/.test(username)){
        alert("Please fill in a valid username.");
    }else if(password.length>16||/[\s]{1,}$/.test(password)
    ||/[^A-z0-9]/.test(password)){
        alert("Please fill in a valid password.");
    }
    //#endregion 
    else{
        flag =true;
    }
    if(flag===true){
        axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/admin/login.php':'http://localhost/nbag/api/admin/login.php',{
            type:'login',
            username:username,
            password:password
        }).then((response)=>{
            dataObj.block=false;
            if(response.data.status==='success'){
                localStorage.setItem('nBagAdmin-page','data')
                localStorage.setItem('nBagAdmin-uid',response.data.uid)
                user.setUid(response.data.uid)
                user.setPage('data')
            }else{
                alert(response.data.message)
            }
        }).catch((e)=>{
            dataObj.block=false;
            alert(e);
        });
    }
}
  useEffect(()=>{
    if(localStorage.getItem('nBagAdmin-page')==='data'&&localStorage.getItem('nBagAdmin-uid')!==null){
        user.setPage('data')
    }
  },[user.page])
  return (
    <div className="background-container">
        <div className="background">
            <div className="content-container displayFlex displayFlexA">
                <div className="content">
                    <div className="title displayFlex displayFlexJ displayFlexA defaultMarginTop">
                        <p>N-Bag: Admin Page</p>
                    </div>
                    <div className="username displayFlex displayFlexA defaultMarginTop">
                        <div className="username-text">
                            <span>Username:</span>
                        </div>
                        <div className="username-input displayFlex displayFlexJ displayFlexA">
                            <input id="username" type="text" name="name" onChange={(e)=>checkInput(e)}/>
                        </div>
                    </div>
                    <div className="password displayFlex displayFlexA defaultMarginTop">
                        <div className="password-text">
                            <span>Password:</span>
                        </div>
                        <div className="password-input displayFlex displayFlexJ displayFlexA">
                            <input id="password" type="password" name="password" onChange={(e)=>checkInput(e)}/>
                        </div>
                    </div>
                
                    <div className='form-login-container displayFlex displayFlexJ defaultMarginTop defaultMarginBot'>
                        <div className={`form-login ${dataObj['block']?'blockTouch':''}`} onClick={()=>loginAction()}>
                        Login
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login