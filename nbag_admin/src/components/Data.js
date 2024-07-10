import React,{useContext,useEffect, useState} from 'react'
import axios from 'axios'
import {User} from '../App'
import '../styles/data.css'

function Data() {
  const user = useContext(User)
  const dataObj = useState({
    'block':false  
  })
  const [dataArr,setDataArr] = useState([0])

  const logoutAction = ()=>{
    localStorage.removeItem('nBagAdmin-uid')
    user.setPage('login')
  }

  const excelAction = ()=>{
    let uid = localStorage.getItem('nBagAdmin-uid')!==''?localStorage.getItem('nBagAdmin-uid'):''
    axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/admin/excel.php':'http://localhost/nbag/api/admin/excel.php', {
      type : 'excel',
      uid: uid
    })
    .then((response)=> {
        if(response.data.status==='success'){
          if(response.data.excel!==''&&response.data.excel!==null){
            var fileURL = window.URL.createObjectURL(new Blob([response.data.excel]));
            var fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', response.data.message);
            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);
          }else{
            alert('Request success but without excel data..')
          }
        }else{
          alert(response.data.message)
        }
        
    })
    .catch(function (error) {
        alert("An error occurred while submitting the form. Please try again."+error);
    });
  }
  let initial = true
  useEffect(()=>{
    if(initial){
      initial=false
      let uid = localStorage.getItem('nBagAdmin-uid')!==''?localStorage.getItem('nBagAdmin-uid'):''
      axios.post(process.env.NODE_ENV==='production'?'https://192.168.68.109/nbag/api/admin/data.php':'http://localhost/nbag/api/admin/data.php',{
          type:'data',
          uid:uid
      }).then((response)=>{
          dataObj.block=false;
          if(response.data.status==='success'){
              let serverData = response['data']['data'];
              let processData = [];
              for(let i =0; i<serverData.length ; i++){
                let date,regNum,comNum,redeemNum;
                date=serverData[i]['date'];
                regNum=serverData[i]['regNum']
                // comNum
                if(serverData[i]['gameStatus']==='true'){
                  comNum=regNum
                }else{
                  comNum=0
                }
                //redeemNum
                if(serverData[i]['gameStatus']==='true' && serverData[i]['redeemStatus']==='true'){
                  redeemNum=regNum
                }else{
                  redeemNum=0
                }
                // initial 
                if(processData.length===0){
                  processData.push({'date':date,'regNum':regNum,'comNum':comNum,'redeemNum':redeemNum});
                }else{
                    let length = processData.length-1
                    if(processData[length]['date']===date){
                      processData[length]['regNum']+=regNum
                      processData[length]['comNum']+=comNum
                      processData[length]['redeemNum']+=redeemNum
                    }else{
                      processData.push({'date':date,'regNum':regNum,'comNum':comNum,'redeemNum':redeemNum}); 
                    }
                }
  
              }
              setDataArr(processData);
              
          }else if(response.data.status==='not'){
            alert('Login data is incorrect. Please login again.')
            localStorage.removeItem('nBagAdmin-page')
            localStorage.removeItem('nBagAdmin-uid')
            user.setPage('login')
          }else{
              alert(response.data.message)
          }
      }).catch((e)=>{
          dataObj.block=false;
          alert(e);
      });
    }
  },[])
  return (
    <div id="main-container">
        <div id="main">
            <div className='table-title-container displayFlex displayFlexJ defaultMarginTop'>
                <div className="table-title">
                  N-bag admin site
                </div>
            </div>
            <div className='table-container displayFlex displayFlexJ defaultMarginTop'>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>No. of registration</th>
                      <th>No. of game completion</th>
                      <th>No. of redeem</th>
                    </tr>
                   
                    {
                    dataArr.map((data,key)=>(
                        <tr key={'t2'+key}>
                          <td>{data['date']}</td>
                          <td>{data['regNum']}</td>
                          <td>{data['comNum']}</td>
                          <td>{data['redeemNum']}</td>
                        </tr>
                    ))
                    }
                        
                    
                  </tbody>
                </table>
            </div>
            <div className="download-container displayFlex displayFlexJ defaultMarginTop">
                <div onClick={()=>excelAction()} className="download displayFlex displayFlexJ displayFlexA">
                    Export csv
                </div>
            </div>
            <div className="logout-container displayFlex displayFlexJ defaultMarginTop">
                <div onClick={()=>logoutAction()} className={`logout ${dataObj.block?'blockTouch':''} displayFlex displayFlexJ displayFlexA`}>
                  Logout
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Data