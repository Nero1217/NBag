import React,{useContext} from 'react'
import {User} from '../App'

function How() {
  const user = useContext(User)
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang);
  }
  const pageAction = ()=>{
    user.setPage('game')
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
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/how/passage1.png`:`/assets/${user.lang}/how/passage1.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage2-container displayFlex displayFlexJ displayFlexA'}>
                      <div className={'passage2'}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/how/passage2.png`:`/assets/${user.lang}/how/passage2.png`} alt="" />
                      </div>
                  </div>
                  <div className={'btn-start-container defaultWidth displayFlex displayFlexJ'}>
                      <div className={'btn-start'} onClick={pageAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/how/btn_start.png`:`/assets/${user.lang}/how/btn_start.png`} alt="" />
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default How