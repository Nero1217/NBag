import React,{useContext,useState} from 'react'
import axios from 'axios'
import {User} from '../App'

function Qna() {
  const user = useContext(User)
  const [qna,setQna] = useState('')
  const qnaStyle  = localStorage.getItem('nbag-urStyle')==='noble'?'style1':
  localStorage.getItem('nbag-urStyle')==='fashion'?'style2':
  localStorage.getItem('nbag-urStyle')==='luscious'?'style3':'style1';
  const dataObj = useState({
    'block':false
  })
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang);
  }
  const qnaAction = (e)=>{
    if((/[^A-z0-9,.。\s\u4e00-\u9fa5]/g).test(e.target.value)){
      e.target.value = e.target.value.replace(/[^A-z0-9,.。\s\u4e00-\u9fa5]/g,'')
    }else if(e.target.value.length>250){
      e.target.value = e.target.value.substr(0, 250)
    }
    setQna(e.target.value)
    
  }
  const pageAction = ()=>{
    dataObj['block']=true
    user.setLoading(true)
    if(document.getElementById('qna').value.length<16){
      alert(user.lang==='tc'?'QNA字數不少於16個。':'QNA length should not less than 16.')
      dataObj['block']=false
      user.setLoading(false)
    }else{
      // axios
      axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/qna.php':'http://localhost/nbag/api/qna.php',{
        'type':'complete',
        'uid':localStorage.getItem('nbag-uid'),
        'qna':qna,
        'lang':user.lang
      }).then((response)=>{
        dataObj['block']=false
        user.setLoading(false)
        if(response.data.status==='success'&&response['data']['email_status']==='success'){
          user.setPage('share')
        }else if(response.data.status==='success'&&response['data']['email_status']==='fail'){
          alert(user.lang==='tc'?'郵件未能發出，請與有關工作人員聯繫。':'Fail to send email.Please contact with the staff.')
          user.setPage('share')
        }else{
          alert(user.lang==='en'?'Qna Page: An error occurred while submitting the form. Please try again. Details: Fail type...':
            'Qna頁面: 伺服器請求失敗,請重新嘗試。詳情:種類錯誤。')
        }
      }).catch((e)=>{
        alert(user.lang==='en'?'Qna Page: An error occurred while submitting the form. Please try again.':
            'Qna頁面: 伺服器請求失敗,請重新嘗試。')
        dataObj['block']=false
        user.setLoading(false)
      })
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
                  <div className={'passage1-container displayFlex displayFlexJ displayFlexA'}>
                      <div className={`passage1 passage1-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/passage1.png`:`/assets/${user.lang}/qna/passage1.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage2-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                      <div className={`passage2 passage2-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/passage2.png`:`/assets/${user.lang}/qna/passage2.png`} alt="" />
                      </div>
                  </div>
                  <div className={'urStyle-container displayFlex displayFlexJ displayFlexA'}>
                      <div className={'urStyle'}>
                      <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/${qnaStyle}.png`:`/assets/${user.lang}/qna/${qnaStyle}.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage3-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                      <div className={`passage3 passage3-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/passage3.png`:`/assets/${user.lang}/qna/passage3.png`} alt="" />
                      </div>
                  </div>
                  <div className={'qna-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                    <textarea className={'qna displayBlock'} id="qna" onChange={(e) => qnaAction(e)}></textarea>
                  </div>
                  <div className={'qna-input-container displayFlex displayFlexA'}>
                    <div className={'qna-input'}>
                          {qna.length} / 250
                    </div> 
                  </div>
                  <div className={'btn-start-container defaultWidth displayFlex displayFlexJ defaultMarginTop'}>
                      <div className={`btn-start ${dataObj.block?'blockTouch':''}`} onClick={pageAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/btn_submit.png`:`/assets/${user.lang}/qna/btn_submit.png`} alt="" /> 
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Qna