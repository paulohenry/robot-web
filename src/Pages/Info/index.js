import React,{useState,useEffect} from 'react'
import {FaArrowLeft, FaPowerOff} from 'react-icons/fa'

import axios from '../../Services/axios'
import {Link} from 'react-router-dom'
import './styles.css'

const Dashboard = ()=> {
  const[ip,setIp]=useState('')  
  const [conect,setConect]=useState('')
  const getIp = async()=>{
    try{
    const result = await axios.get('/ip-conf')
    const toObj = JSON.parse(result.data)
    const res=Object.entries(toObj).filter((e,index)=> {return index === 1})
    const res1 = res[0][1].filter((e,index)=>{return e.family === 'IPv4'})
    setIp(res1[0].address)
    }catch(error){
      setIp('erro ao capturar ip')
    }
  }

  const shutdown = async()=>{
    await axios.get('/shut-down')
  }
  const currentConected =async()=>{
    try{
     const resp = await axios.get('/current-wifi')
     
     setConect(`conectado em : ${resp.data[0].ssid}`)
    }catch(error){
      setConect(`nenhuma rede identificada`)
    }
  }
  useEffect(()=>{ 
      getIp()   
      currentConected()     
  },[])

  return (
    <div className="container">
      <Link to="/menu" className="button-voltar">
        <button >
          <FaArrowLeft size={125}/>
        </button>
      </Link>
      <button className="button-desligar" onClick={()=>shutdown()}>
        <FaPowerOff size={125}/>
      </button>
      <div className="div-list">
      
      <p id="list"></p>
      <p className="ip-txt" >{conect}</p>
      <p className="ip-txt">digite este endereço no seu navegador</p>
      <p className="ip-txt">http://{ip}:3002</p>  
      </div>
      
    </div>
  )      
}

export default Dashboard;