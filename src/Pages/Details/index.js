import React,{useState,useEffect} from 'react'

import * as network from 'network-info'
import axios from '../../Services/axios'
import './styles.css'

const Dashboard = ()=> {
  const[ip,setIp]=useState('')  

  const getIp = async()=>{
    const result = await axios.get('/ipconf')
    const toObj = JSON.parse(result.data)
    const res=Object.entries(toObj).filter((e,index)=> {return index === 1})
    const res1 = res[0][1].filter((e,index)=>{return e.family === 'IPv4'})
    setIp(res1[0].address)
  }

  useEffect(()=>{ 
      getIp()      
  },[])

  return (
    <div className="container">
      <a href="/">
        <button className="button-voltar">Voltar</button>
      </a>
      <p id="list"></p>
      <p className="ip-txt">digite este endereço no seu navegador</p>
      <p className="ip-txt">http://{ip}:3002</p>  
    </div>
  )      
}

export default Dashboard;