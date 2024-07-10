import React,{useState,useEffect} from 'react'
import './App.css';
import HomeC from './components/HomeC'
import Intro from './components/Intro'
import Register from './components/Register';
import How from './components/How';
import Game from './components/Game';
import Qna from './components/Qna';
import Share from './components/Share'
import Redeem from './components/Redeem'

export const User = React.createContext()

function App() {
  const [page,setPage] = useState('home')
  const [lang,setLang] = useState((new URL(window.location)).searchParams.get('lang')==='en'?'en':'tc')
  const [loading,setLoading] = useState(false)
  const [uid,setUid] = useState('')
  const [urStyle,setUrStyle] = useState('Nothing chosen.')
  const toHomeAction = ()=>{
    setPage('home')
    window.location.reload()
  }
  
  useEffect(()=>{
    let searchURL = new URL(window.location)
    if(lang==='tc'&&searchURL.searchParams.get('lang')==='en'){
      searchURL.searchParams.set('lang', 'tc');
      window.history.pushState({}, '', searchURL)
    }else if(lang==='en'&&searchURL.searchParams.get('lang')==='tc'){
      searchURL.searchParams.set('lang', 'en');
      window.history.pushState({}, '', searchURL)
    }
    if(searchURL.searchParams.get('lang')==='tc'){
      searchURL.searchParams.set('lang', 'tc');
      window.history.pushState({}, '', searchURL)
    }else if(searchURL.searchParams.get('lang')==='en'){
      searchURL.searchParams.set('lang', 'en');
      window.history.pushState({}, '', searchURL)
    }else if(searchURL.searchParams.get('lang')!=='en'&&searchURL.searchParams.get('lang')!=='tc'){
      searchURL.searchParams.set('lang', 'tc');
      window.history.pushState({}, '', searchURL)
    }
  },[lang])
  useEffect(()=>{
    const enableGoogleAnalytics = (value)=>{
      activateGtm(window,document,'script','dataLayer',value);
    }
    
    const activateGtm = (w,d,s,l,i)=>{
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!=='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
    }
    enableGoogleAnalytics('GTM-NGP8NGPC');
    let searchURL = new URL(window.location)
    if(searchURL.searchParams.get('p')==='re'&&searchURL.searchParams.get('uid')!==null){
      setPage('redeem')
      if(searchURL.searchParams.get('lang')==='en'){
        setLang('en')
        searchURL.searchParams.set('lang', 'en');
        window.history.pushState({}, '', searchURL)
      }else{
        setLang('tc')
        searchURL.searchParams.set('lang', 'tc');
        window.history.pushState({}, '', searchURL)
      }
    }
  },[page])
  
  let message = ''
  switch(page){
    case 'home':
      message = <HomeC/>
      require('./styles/HomeC.css')
      break
    case 'intro':
      message = <Intro/>
      require('./styles/Intro.css')
      break
    case 'register':
      message = <Register/>
      require('./styles/Register.css')
      break
    case 'how':
      message = <How/>
      require('./styles/How.css')
      break
    case 'game':
      message = <Game/>
      require('./styles/Game.css')
      break
    case 'qna':
      message = <Qna/>
      require('./styles/Qna.css')
      break
    case 'share':
      message = <Share/>
      require('./styles/Share.css')
      break
    case 'redeem':
      message = <Redeem/>
      require('./styles/Redeem.css')
      break
    default:
      message = ''
  }
  return (
    <div className="App">
      <User.Provider value={{
        'page':page,'setPage':setPage,
        'uid':uid,'setUid':setUid,
        'lang':lang,'setLang':setLang,
        'loading':loading,'setLoading':setLoading,
        'urStyle':urStyle,'setUrStyle':setUrStyle,
        'toHome':toHomeAction
      }}>
        {message}
      </User.Provider>
      <div className={`spinner-box displayFlex ${loading?'displayBlock':'displayNone'} displayFlexJ displayFlexA`}>
          <div className="three-quarter-spinner"></div>
      </div>
    </div>
  );
}

export default App;
