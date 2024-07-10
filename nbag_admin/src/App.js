import React,{useState} from 'react'
import './App.css';
import Login from './components/Login'
import Data from './components/Data'

export const User = React.createContext()

function App() {
  const [page,setPage] = useState('login')
  const [uid,setUid] = useState('')
  let message;
  switch(page){
    case 'login':
      message = <Login/>
      break;
    case 'data':
      message = <Data/>
      break;
    default:
      message = <p>404 error..</p>
  }
  
  return (
    <div className="App">
      <User.Provider value={{
        'page':page,'setPage':setPage,
        'uid':uid,'setUid':setUid
      }}>
        {message}
      </User.Provider>
      
    </div>
  );
}

export default App;
