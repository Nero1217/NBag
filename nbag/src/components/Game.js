import React,{useContext,useState} from 'react'
import axios from 'axios'
import {User} from '../App'

function Game() {
  const user = useContext(User)
  const [bagChoiceNum,setBagChoiceNum] = useState('')
  const [bagChoice,setBagChoice] = useState('')
  const bagChoiceList = useState({
    '1':'Birkin Bag 白金包','2':'Kelly Bag 凱莉包','3':'Square Bag 小方包'
  });
  const dataObj = useState({
    'block':false
  })
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang)
  }
  const bagAction = (value)=>{
    setBagChoice(bagChoiceList[0][value])
    setBagChoiceNum(value)
  }
  const pageAction = ()=>{
    // blockTouch button
    dataObj['block']=true
    user.setLoading(true)
    user.setUrStyle(bagChoiceNum)
    let urStyle;
    switch(bagChoiceNum){
      case '1':
        urStyle='noble'
        break;
      case '2':
        urStyle='fashion'
        break;
      case '3':
        urStyle='luscious'
        break;
      default:
        urStyle=''
    }
    // axios
    axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/game.php':'http://localhost/nbag/api/game.php',{
      'type':'complete',
      'uid':localStorage.getItem('nbag-uid'),
      'urStyle':urStyle
    }).then((response)=>{
      dataObj['block']=false
      user.setLoading(false)
      if(response.data.status==='success'){
        localStorage.setItem('nbag-urStyle',urStyle)
        user.setPage('qna')
      }else{
        alert(user.lang==='en'?'An error occurred while submitting the form. Please try again. Details: Fail type...':
          '伺服器請求失敗,請重新嘗試。詳情:種類錯誤。')
      }
    }).catch((e)=>{
      alert(user.lang==='en'?'An error occurred while submitting the form. Please try again. Details: Fail type...':
          '伺服器請求失敗,請重新嘗試。詳情:種類錯誤。')
      dataObj['block']=false
      user.setLoading(false)
    })
  }
  let langReverse = user.lang==='en'? 'tc':'en'
  return (
    <div className='background-container'>
       <div className='background'>
          <img className="defaultBlock" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/tc/game1/background.png":"/assets/tc/game1/background.png"} alt="" />
          <div className='content-container'>
              <div className='content'>
                  <div className='logo-container defaultWidth displayFlex displayFlexJ displayFlexA'>
                      <div className='logo' onClick={logoAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/tc/game1/logo1.png":"/assets/tc/game1/logo1.png"} alt="" />
                      </div>
                  </div>
                  <div className='lang-container'>
                      <div className='lang' onClick={langAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/common/btn_${langReverse}.png`:`/assets/common/btn_${langReverse}.png`} alt="" />
                      </div>
                  </div>
                  <div className={'heading-container displayFlex displayFlexJ'}>
                      <div className={`heading-${user.lang} heading`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/passage1.png`:`/assets/${user.lang}/game1/passage1.png`} alt="" />
                      </div>
                  </div>
                  <div className={'bags-container displayFlex displayFlexJ displayFlexA'}>
                      <div className={'bags defaultWidth displayFlex'}>
                        {/* bag1 */}
                        <div className={'bag-container'}>
                          <div onClick={()=>bagAction('1')} className={'bag'}>
                            <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/bag1.png`:`/assets/${user.lang}/game1/bag1.png`} alt="" />
                          </div>
                        </div>
                        {/* bag2 */}
                        <div className={'bag-container'}>
                          <div onClick={()=>bagAction('2')} className={'bag'}>
                            <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/bag2.png`:`/assets/${user.lang}/game1/bag2.png`} alt="" />
                          </div>
                        </div>
                        {/* bag3 */}
                        <div className={'bag-container'}>
                          <div onClick={()=>bagAction('3')} className={'bag'}>
                            <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/bag3.png`:`/assets/${user.lang}/game1/bag3.png`} alt="" />
                          </div>
                        </div>
                      </div>
                  </div>
                  <div className={'passage2-container'}>
                      <div className={'defaultBlock displayFlex displayFlexA'}>
                          <div className={'passage2-img-container'}>
                            <div className={'passage2-img'}>
                              <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/passage2.png`:`/assets/${user.lang}/game1/passage2.png`} alt="" />
                            </div>
                          </div>
                          <div className={'passage2-img2-container'}>
                            <div className={'passage2-img2'}>
                              {bagChoice}
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className={'btn-next-container defaultMarginTop defaultWidth displayFlex displayFlexJ'}>
                      <div className={`btn-next ${dataObj.block?'blockTouch':''}`} onClick={pageAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/game1/btn_confirm.png`:`/assets/${user.lang}/game1/btn_confirm.png`} alt="" />
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Game