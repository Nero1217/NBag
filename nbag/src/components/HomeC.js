import React,{useContext} from 'react'
import {User} from '../App'

function HomeC() {
  const user = useContext(User)
  const pageAction = ()=>{
    user.setPage('intro')
  }
  const logoAction = ()=>{
    user.toHome()
  }
  return (
    <div className='background-container'>
       <div className='background'>
          <img className="defaultBlock" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/common/background1.png":"/assets/common/background1.png"} alt="" />
          <div className='content-container'>
              <div className='content'>
                  <div className='logo-container defaultWidth displayFlex displayFlexJ displayFlexA'>
                      <div className='logo' onClick={logoAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/common/logo1.png":"/assets/common/logo1.png"} alt="" />
                      </div>
                  </div>
                  <div className={'icon-container defaultWidth displayFlex displayFlexJ displayFlexA'}>
                      <div className='icon'>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?"http://192.168.68.109/nbagWeb/assets/en/home/icon.png":"/assets/en/home/icon.png"} alt="" />
                      </div>
                  </div>
                  <div className={'passage1-container defaultWidth displayFlex displayFlexJ'}>
                      <div className={`passage1 passage1-${user.lang}`} onClick={pageAction}>
                          <img className="defaultImg" src={process.env.NODE_ENV==='production'?`http://192.168.68.109/nbagWeb/assets/${user.lang}/home/passage1.png`:`/assets/${user.lang}/home/passage1.png`} alt="" />
                      </div>
                  </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default HomeC