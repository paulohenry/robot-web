import React,{useEffect} from 'react';
 import './styles.css';
import axios from '../../Services/axios'

const Wifi  = ()=> {


  const getWifi = async()=>{
    const res = await axios.get('/listwifi')
    console.log(res)
  }
  useEffect(()=>{
    getWifi()
  }
  ,[])
  return <div>Wifi screen</div>;
}

export default Wifi;