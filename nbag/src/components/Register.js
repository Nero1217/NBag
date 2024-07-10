import React,{useContext,useEffect, useState} from 'react'
import {User} from '../App'
import axios from 'axios'

function Register() {
  const user = useContext(User)
  const [title,setTitle] = useState('')
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [yy,setYy] = useState('')
  const [mm,setMm] = useState('')
  const [dd,setDd] = useState('')
  const [region,setRegion] = useState('')
  const [mobile,setMobile] = useState('')
  const [email,setEmail] = useState('')
  const [tnc,setTnc] = useState(false)
  const [submitObj,setSubmitObj] = useState({
    'block':false
  })

  const [titleList] = useState([
    {id:'title1',value:{en:'Mr.',tc:'先生'}},
    {id:'title2',value:{en:'Mrs.',tc:'太太'}},
    {id:'title3',value:{en:'Ms.',tc:'女士'}}
  ])
  let yyRange = {
    'start':1930,
    'end':2004
  }
  const [yyList] = useState([])
  const [mmList] = useState([])
  const [ddList,setDdList] = useState([])
  const [regionList] = useState([
    {id:'hk1',name:'HongKong',code:'+852',length:8},
    {id:'tw1',name:'Taiwan',code:'+886',length:10},
    {id:'china1',name:'China',code:'+86',length:8},
    {id:'ma1',name:'Malaysia',code:'+60',length:9},
  ])
  // mounted/updated
  // render yy,mm list
  useEffect(()=>{
    setYy([])
    setMm([])
    for(let y = yyRange.end ; y>=yyRange.start ; y--){
      yyList.push({id:'yy'+y,value:y});
    }
    for(let m = 1 ; m<=12 ; m++){
      mmList.push({id:'mm'+m,value:m});
    }
  },[yyList,mmList,yyRange.end,yyRange.start])
  // render ddList
  useEffect(()=>{
    setDdList([])
    if(yy.length>0 && mm.length>0){
      let date = new Date(yy,mm,0).getDate();
      let list =[];
      for(let i=1; i<=date ; i++){
        list.push({id:'dd'+i,value:i});
      }
      setDdList(list)
    }
  },[yy,mm]) 
  // methods
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang);
  }
  const tncAction = ()=>{
    window.open('https://www.google.com','_blank')
  }
  const pageAction = ()=>{
    user.setLoading(true)
    setSubmitObj(prevState=>({
      // 如果object多過一個就要用
      // ...prevState,
      block:true
    }))
    let flag = false;
    //#region check empty
    if(title===''){
      alert(user.lang==='en'?"Please fill in the title.":"請填寫稱謂。")
    }else if(fname===''){
      alert(user.lang==='en'?"Please fill in the first name.":"請填寫名字。")
    }else if(lname===''){
      alert(user.lang==='en'?"Please fill in the last name.":"請填寫姓氏。")
    }else if(yy===''||mm===''||dd===''){
      alert(user.lang==='en'?"Please fill in the birthday.":"請填寫出生日期。")
    }else if(region===''){
      alert(user.lang==='en'?"Please fill in the country code.":"請填寫國家代碼。")
    }else if(mobile===''){
      alert(user.lang==='en'?"Please fill in the mobile number.":"請填寫手機號碼。")
    }else if(email===''){
      alert(user.lang==='en'?"Please fill in the E-mail.":"請填寫電郵地址。")
    }
    //#endregion
    //#region 限制長度
    else if(fname.length<1 || fname.length>16){
        alert(user.lang==='en'?"Please fill in a valid first name.":"請填寫有效名字。")
    }else if(lname.length<1 || lname.length>16){
        alert(user.lang==='en'?"Please fill in a valid last name.":"請填寫有效姓氏。")
    }else if(mobile.length>12){
        alert(user.lang==='en'?"Please fill in a valid mobile number.":"請填寫有效手機號碼。")
    }else if(email.length<6 || email.length>26){
      alert(user.lang==='en'?"Please fill in a valid email.":"請填寫有效電郵地址。")
    } 
    //#endregion    
    //#region 空白鍵
    else if(/[\s]{1,}$/.test(fname)){
      alert(user.lang==='en'?"Please fill in a valid first name.":"請填寫有效名字。")
    }else if(/[\s]{1,}$/.test(lname)){
      alert(user.lang==='en'?"Please fill in a valid last name.":"請填寫有效姓氏。")
    }else if(/[\s]{1,}$/.test(mobile)){
      alert(user.lang==='en'?"Please fill in a valid mobile number.":"請填寫有效手機號碼。")
    }else if(/[\s]{1,}$/.test(email)){
      alert(user.lang==='en'?"Please fill in a valid email.":"請填寫有效電郵地址。")
    }
    //#endregion
     //#region Special
    else if (/[^A-z\u4e00-\u9fa5]/.test(fname)){ //fname中或英
      alert(user.lang==='en'?"Please fill in a valid first name.":"請填寫有效名字。")
  }else if (/[^A-z\u4e00-\u9fa5]/.test(lname)){ //lname中或英
      alert(user.lang==='en'?"Please fill in a valid last name.":"請填寫有效姓氏。")
  }else if (/[0-9]{6,}/.test(mobile)===false){ //mobile只可以是number
      alert(user.lang==='en'?"Please fill in a valid mobile number.":"請填寫有效手機號碼。")
  }else if (/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)===false){  
      // /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/   /[^A-z0-9@.]/
      alert(user.lang==='en'?"Please fill in a valid email.":"請填寫有效電郵地址。")
  }else if(tnc===false){
      alert(user.lang==='en'?"Please check the terms and conditions.":"請同意條款及細則。")
  }else{
    flag=true;
  }
  if(flag===false){
    setSubmitObj(()=>({
      'block':false
    }));
    user.setLoading(false)
  }else{
    axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/register.php':'http://localhost/nbag/api/register.php',{
      'type':'game1',
      'title':title,
      'fname':fname,
      'lname':lname,
      'yy':yy,
      'mm':mm,
      'dd':dd,
      'region':region,
      'mobile':mobile,
      'email':email,
      'tnc':tnc,
    }).then((response)=>{
      setSubmitObj(()=>({
        'block':false
      }));
      user.setLoading(false)
      if(response.data.status==='success'){
        localStorage.setItem('nbag-uid',response.data.uid)
        localStorage.setItem('nbag-title',response.data.title)
        localStorage.setItem('nbag-fname',response.data.fname)
        localStorage.setItem('nbag-lname',response.data.lname)
        user.setPage('how')
      }else if(response.data.status==='fail'){
        if(response.data.message==='Empty type'){
          alert(user.lang==='en'?'An error occurred while submitting the form. Please try again. Details: Fail type...':
          '伺服器請求失敗,請重新嘗試。詳情:種類錯誤。')
        }else if(response.data.message==='Empty title'){
          alert(user.lang==='en'?'Please fill in the title.':
          '請輸入稱謂。')
        }else if(response.data.message==='Empty fname'){
          alert(user.lang==='en'?'Please fill in the first name.':
          '請輸入名字。')
        }else if(response.data.message==='Empty lname'){
          alert(user.lang==='en'?'Please fill in the last name.':
          '請輸入姓氏。')
        }else if(response.data.message==='Empty birthday'){
          alert(user.lang==='en'?'Please fill in the birthday.':
          '請輸入生日。')
        }else if(response.data.message==='Empty region'){
          alert(user.lang==='en'?'Please fill in the country code.':
          '請輸入國家區碼。')
        }else if(response.data.message==='Empty mobile'){
          alert(user.lang==='en'?'Please fill in the mobile number.':
          '請輸入手機號碼。')
        }
        // invalid
        else if(response.data.message==='Invalid title'){
          alert(user.lang==='en'?'Please fill a valid title.':
          '請輸入有效稱謂')
        }
        else if(response.data.message==='Invalid fname'){
          alert(user.lang==='en'?'Please fill a valid first name.':
          '請輸入有效名字')
        }else if(response.data.message==='Invalid lname'){
          alert(user.lang==='en'?'Please fill a valid last name.':
          '請輸入有效姓氏')
        }else if(response.data.message==='Invalid birthday'){
          alert(user.lang==='en'?'Please fill a valid birthday.':
          '請輸入有效生日。')
        }else if(response.data.message==='Invalid region'){
          alert(user.lang==='en'?'Please fill a valid region.':
          '請輸入有效國家區碼。')
        }else if(response.data.message==='Invalid mobile'){
          alert(user.lang==='en'?'Please fill a valid mobile.':
          '請輸入有效電話號碼。')
        }else if(response.data.message==='Invalid email'){
          alert(user.lang==='en'?'Please fill a valid email.':
          '請輸入有效電子郵件。')
        }else if(response.data.message==='Invalid tnc'){
          alert(user.lang==='en'?"Please check the terms and conditions.":
          "請同意條款及細則。")
        }else if(response.data.message==='Invalid submit'){
          alert(user.lang==='en'?"An error occurred while submitting the form. Please try again.":
          "伺服器請求失敗。")
        }else{
          alert(user.lang==='en'?"Fail...":
          "失敗。")
        }
      }else if(response.data.status==='complete'){
        if(response.data.message==='exist'){
          alert(user.lang==='en'?"Account is existed.":
          "帳號已存在。")
        }else{
          alert(user.lang==='en'?"An error occurred while submitting the form. Please try again. Details: OK but without response.":
          "要求通過但沒回應。")
        }
      }else{
        alert(user.lang==='en'?"An error occurred while submitting the form. Please try again. Details: Error in response status.":
        "伺服器請求失敗,請重新嘗試。詳情:回應狀態錯誤。")
      }
    }).catch((e)=>{
      alert(user.lang==='en'?"fail request to server.":"伺服器請求失敗。")
      setSubmitObj(()=>({
        'block':false
      }));
      user.setLoading(false)
    })
  }
    
  }
  const checkInput = (e,item,action)=>{
      let lengthList = {
        'fname':16,
        'lname':16,
        'email':26
      }
      if(e.target.id==='fname-i'||e.target.id==='lname-i'){
        if(e.target.value.length>lengthList[item]){
            action((prevState)=>prevState.slice(0,lengthList[item])) 
        }
        if((/[^A-z\u4e00-\u9fa5]/g).test(e.target.value)){
            action((prevState)=>prevState.replace(/[^A-z\u4e00-\u9fa5]/g,''))
        }
      }else if(e.target.id==='mobile-i'){
        if(region===''){
            action((prevState)=>prevState.slice(0,0)) 
            alert(user.lang==='en'?'Please select the country code first.':'請先選擇地區碼。');
        }else{
          for(let i=0;i<regionList.length;i++){
            if(region===regionList[i]['code']){
              action((prevState)=>prevState.slice(0,regionList[i]['length'])) 
              break;
            }
          }
        }
        if((/[^0-9]/g).test(e.target.value)){
            action((prevState)=>prevState.replace(/[^A-z]/g,''))
        }
      }else if(e.target.id==='email-i'){
        if(e.target.value.length>lengthList[item]){
            action((prevState)=>prevState.slice(0,lengthList[item])) 
        }
        if((/[^A-z0-9.@]/g).test(e.target.value)){
            action((prevState)=>prevState.replace(/[^A-z0-9.@]/g,''))
        }
      }
  }

  let langReverse = user.lang==='en'? 'tc':'en'
  return (
    <div className='background-container'>
       <div className='background'>
          <img className="defaultBlock" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/common/background2.png":"/assets/common/background2.png"} alt="" />
          <div className='content-container'>
              <div className='content'>
                  <div className='logo-container defaultWidth displayFlex displayFlexJ displayFlexA'>
                      <div className='logo' onClick={logoAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/common/logo1.png":"/assets/common/logo1.png"} alt="" />
                      </div>
                  </div>
                  <div className='lang-container'>
                      <div className='lang' onClick={langAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/common/btn_${langReverse}.png`:`/assets/common/btn_${langReverse}.png`} alt="" />
                      </div>
                  </div>
                  <div className={'heading-container displayFlex displayFlexJ'}>
                      <div className={`heading-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/passage1.png`:`/assets/${user.lang}/register/passage1.png`} alt="" />
                      </div>
                  </div>
                  {/* title */}
                  <div className={'title-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width title displayFlex'}>
                        <div className={`common-text title-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth title-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/title.png`:`/assets/${user.lang}/register/title.png`} alt="" />
                          </div>
                        </div>
                        <div className={'common-input title-input-container'}>
                          <div className={`defaultBlock displayFlex displayFlexA title-input-${user.lang}`}>
                              <select className='defaultInput' value={title} onChange={(e)=>setTitle(e.target.value)}>
                                <option value="" key="" >{user.lang==='en'?'--Select--':'--點擊選擇--'}</option>
                                {titleList.map((item)=>{return <option value={item['value']['en']} key={item.id}>{item['value'][user.lang]}</option>})}
                              </select>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* fname */}
                  <div className={'fname-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width fname displayFlex'}>
                        <div className={`common-text fname-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth fname-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/fname.png`:`/assets/${user.lang}/register/fname.png`} alt="" />
                          </div>
                        </div>
                        <div className={'common-input fname-input-container'}>
                          <div className={`defaultBlock displayFlex displayFlexA fname-input-${user.lang}`}>
                              <input id="fname-i" className="defaultInput" type="text" value={fname} onChange={(e)=>{setFname(e.target.value);checkInput(e,fname,setFname)}}/>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* lname */}
                  <div className={'lname-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width lname displayFlex'}>
                        <div className={`common-text lname-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth lname-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/lname.png`:`/assets/${user.lang}/register/lname.png`} alt="" />
                          </div>
                        </div>
                        <div className={'common-input lname-input-container'}>
                          <div className={`defaultBlock displayFlex displayFlexA lname-input-${user.lang}`}>
                              <input id="lname-i" className="defaultInput" type="text" value={lname} onChange={(e)=>{setLname(e.target.value);checkInput(e,lname,setLname)}}/>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* birthday */}
                  <div className={'birth-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width birth displayFlex'}>
                        <div className={`common-text birth-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth birth-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/birth.png`:`/assets/${user.lang}/register/birth.png`} alt="" />
                          </div>
                        </div>
                        <div className={`birth-input-container common-input`}>
                          <div className={`birth-input defaultBlock displayFlex`}>
                            <div className={`common-birth yy-container`}>
                              <div className={'yy displayFlex displayFlexA defaultBlock'}>
                                  <select className='defaultInput' value={yy} onChange={(e)=>setYy(e.target.value)}>
                                    <option value="" key="yy">{user.lang==='en'?'yy':'年'}</option>
                                    {yyList.map((item)=>{return <option value={item.value} key={item.id}>{item.value}</option>})}
                                  </select>
                              </div>
                            </div>
                            <div className={'common-birth mm-container'}>
                              <div className={'mm defaultBlock displayFlex displayFlexA'}>
                                  <select className='defaultInput' value={mm} onChange={(e)=>setMm(e.target.value)}>
                                    <option value="" key="mm">{user.lang==='en'?'mm':'月'}</option>
                                    {mmList.map((item)=>{return <option value={item.value} key={item.id}>{item.value}</option>})}
                                  </select>
                              </div>
                            </div>
                            <div className={'common-birth dd-container'}>
                              <div className={'dd defaultBlock displayFlex displayFlexJ'}>
                                  <select className='defaultInput' value={dd} onChange={(e)=>setDd(e.target.value)}>
                                    <option value="" key="dd">{user.lang==='en'?'dd':'日'}</option>
                                    {ddList.length>0?ddList.map((item)=>{return <option value={item.value} key={item.id}>{item.value}</option>}):null}
                                  </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* mobile */}
                  <div className={'mobile-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width mobile displayFlex'}>
                        <div className={`common-text mobile-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth mobile-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/mobile.png`:`/assets/${user.lang}/register/mobile.png`} alt="" />
                          </div>
                        </div>
                        <div className={'mobile-container common-input'}>
                          <div className={'mobile defaultBlock displayFlex'}>
                            <div className={'region-container'}>
                              <div className={'region defaultBlock displayFlex displayFlexA'}>
                                  <select className='defaultInput' value={region} onChange={(e)=>{setRegion(e.target.value);setMobile('')}}>
                                    <option value="" key="r1">+</option>
                                    {regionList.map((item)=>{return <option value={item.code} key={item.id}>{item.code}</option>})}
                                  </select>
                              </div>
                            </div>
                            <div className={'mobile-input-container'}>
                              <div className={'mobile-input defaultBlock displayFlex displayFlexJ displayFlexA'}>
                                  <input id="mobile-i" className="defaultInput" type="text" value={mobile} onChange={(e)=>{setMobile(e.target.value);checkInput(e,mobile,setMobile)}}/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* email */}
                  <div className={'email-container common-row-height defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'common-row-width email displayFlex'}>
                        <div className={`common-text email-text-container-${user.lang} displayFlex displayFlexA`}>
                          <div className={`defaultWidth email-text-${user.lang}`}>
                            <img className="defaultWidth" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/email.png`:`/assets/${user.lang}/register/email.png`} alt="" />
                          </div>
                        </div>
                        <div className={`common-input email-input-container`}>
                          <div className={`defaultBlock displayFlex displayFlexA email-input-${user.lang}`}>
                              <input id="email-i" className="defaultInput" type="text" value={email} onChange={(e)=>{setEmail(e.target.value);checkInput(e,email,setEmail)}}/>
                          </div>
                        </div>
                      </div>
                  </div>
                  {/* tnc */}
                  <div className={'tnc-container defaultMarginTop displayFlex displayFlexJ'}>
                      <div className={'tnc common-row-width displayFlex'}>
                          <div className={'tnc-check-container defaultRelative'}>
                              <input className={'tnc-check-input defaultBlock'} value={tnc} onChange={(e)=>{setTnc((prevState)=>!prevState);}} name="checked" type="checkbox"/>
                              <span className={'checkmark'}></span>
                          </div>
                          <div className={'tnc-text-container displayBlock'}>
                              <div className="tnc-text" onClick={tncAction}>
                                  <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/tnc.png`:`/assets/${user.lang}/register/tnc.png`} alt=""/>
                              </div>
                          </div>
                      </div>
                  </div>
                  {/* btn_reg */}
                  <div className={`btn-register-container defaultWidth defaultMarginTop 
                  displayFlex displayFlexJ ${submitObj['block']===true?'blockTouch':''}`}>
                      <div className={'btn-register'} onClick={pageAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/register/btn_register.png`:`/assets/${user.lang}/register/btn_register.png`} alt="" />
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Register