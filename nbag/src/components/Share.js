import React,{useContext} from 'react'
import {User} from '../App'

function Share() {
  const user = useContext(User)
  const qnaStyle  = localStorage.getItem('nbag-urStyle')==='noble'?'style1':
  localStorage.getItem('nbag-urStyle')==='fashion'?'style2':
  localStorage.getItem('nbag-urStyle')==='luscious'?'style3':'style1'
  const logoAction = ()=>{
    user.toHome()
  }
  const langAction = ()=>{
    let lang = user.lang==='en'? 'tc':'en'
    user.setLang(lang);
  }
  const shareAction = ()=>{
    if(navigator.share){
        navigator.share({
            title: "nBag message: "+localStorage.getItem('nbag-urStyle'),
            text: "Play the nBag app",
            url: "https://www.google.com"
        })
    }
  }
  const exploreAction = ()=>{
    window.open('https://www.google.com','_blank')
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
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/share/passage1.png`:`/assets/${user.lang}/share/passage1.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage2-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                      <div className={`passage2 passage2-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/share/passage2.png`:`/assets/${user.lang}/share/passage2.png`} alt="" />
                      </div>
                  </div>
                  <div className={'passage3-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                      <div className={`passage3 passage3-${user.lang}`}>
                        <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/passage3.png`:`/assets/${user.lang}/qna/passage3.png`} alt="" />
                      </div>
                  </div>
                  <div className={'urStyle-container displayFlex displayFlexJ displayFlexA defaultMarginTop'}>
                      <div className={'urStyle'}>
                      <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/qna/${qnaStyle}.png`:`/assets/${user.lang}/qna/${qnaStyle}.png`} alt="" />
                      </div>
                  </div>
                  <div className={'btn-share-container defaultWidth displayFlex displayFlexJ defaultMarginTop'}>
                      <div className={'btn-share'} onClick={()=>shareAction()}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/share/btn_share.png`:`/assets/${user.lang}/share/btn_share.png`} alt="" />
                      </div>
                  </div>
                  <div className={'btn-explore-container defaultWidth displayFlex displayFlexJ defaultMarginTop'}>
                      <div className={'btn-explore'} onClick={()=>exploreAction()}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/share/btn_explore.png`:`/assets/${user.lang}/share/btn_explore.png`} alt="" />
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Share