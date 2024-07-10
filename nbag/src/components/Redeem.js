import React,{useContext,useState} from 'react'
import axios from 'axios'
import {User} from '../App'

function Redeem() {
  const user = useContext(User)
  const [rStatus,setRStatus] = useState(false) 
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang);
  }
  const redeemAction = ()=>{
    let params = new URL(document.location).searchParams;
    let uid = params.get("uid");
    // axios
    axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/redeem.php':'http://localhost/nbag/api/redeem.php',{
      'type':'complete',
      'uid':uid,
      'redeem':document.getElementById('redeem-i').value
    }).then((response)=>{
      if(response.data.status==='success'){
        setRStatus(true)
      }else{
        alert(user.lang==='en'?'Fail to redeem.':
          'Redeem失敗。')
      }
     
    }).catch((e)=>{
      alert(user.lang==='en'?'An error occurred while submitting the form. Please try again.':
          '伺服器請求失敗,請重新嘗試。')
    })
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
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/common/logo1.png":"/assets/common/logo1.png"}  alt="" />
                      </div>
                  </div>
                  <div className='lang-container'>
                      <div className='lang' onClick={langAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/common/btn_${langReverse}.png`:`/assets/common/btn_${langReverse}.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage1-container displayFlex displayFlexJ displayFlexA'}>
                      <div className={`passage1 passage1-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/redeem/passage1.png`:`/assets/${user.lang}/redeem/passage1.png`} alt="" />
                      </div>
                  </div>
                  {!rStatus&&<div>
                    <div className={'passage2-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                        <div className={`passage2 passage2-${user.lang}`}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/redeem/passage2.png`:`/assets/${user.lang}/redeem/passage2.png`} alt="" />
                        </div>
                    </div>
                    <div className={'redeem-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                        <div className={'redeem'}>
                          <input type="text" id="redeem-i"/>
                        </div>
                    </div>
                    <div className={'btn-submit-container defaultWidthdisplayFlex displayFlexJ defaultMarginTop'}>
                        <div className={'btn-submit'} onClick={()=>redeemAction()}>
                            <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/redeem/btn_submit.png`:`/assets/${user.lang}/redeem/btn_submit.png`} alt="" />
                        </div>
                    </div>
                  </div>}
                {rStatus&&<div className={`displayFlex displayFlexJ defaultMarginTop`}>{user.lang==='tc'?'兌換獎品成功!':'Redeem Success!'}</div>}
                  
                  
              </div>
          </div>
       </div>
    </div>
  )
}

export default Redeem