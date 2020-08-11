import React,{useState,useEffect} from 'react'
import './styles.css'
import {Link} from 'react-router-dom'

const internalIp = require('public-ip')


const Dashboard = ()=> {

  const[ip,setIp]=useState('')
  
  const ipFun3 = async()=>{
    const res = await internalIp.v4()
    console.log(res)
    }
  
  useEffect(()=>{
    const ipDate = ipFun3()
    
  },[])

  return (
    <div className="container">
      <Link to="/">
        <button className="button-voltar">Voltar</button>
      </Link>
      <p className="ip-txt">digite este endereço no seu navegador</p>
      <p className="ip-txt">http://{ip}:3002</p>  
    </div>
  )      
}

export default Dashboard;