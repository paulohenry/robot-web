import React,{useEffect,useState} from 'react'
import {ContainerMenu, ContainerCard, CardUser} from './style'
import avatar from '../../Assets/avatar.jpg'
import {FaUserAlt, FaInfo, FaWifi, FaRobot} from 'react-icons/fa'
import {Link}from 'react-router-dom'

export default function Menu(props) {
 const [ user, setUser]=useState([])

const loadUser = ()=>{
  const data = JSON.parse(localStorage.getItem('currentDatas'))
  setUser(data)
  console.log(data)
}


 useEffect(()=>{
    loadUser() 
    
 },[])


  return (
    
    <ContainerMenu>
     
      <Link to="/">
        <ContainerCard area={'Login'}>
           <FaUserAlt size={125}/>
        </ContainerCard>
      </Link>
      <Link to="/info">
        <ContainerCard area={'Info'}>
         <FaInfo size={125}/>
        </ContainerCard>
      </Link>      
      <Link to="/wifi">
        <ContainerCard area={'Wifi'}>
         <FaWifi size={125}/>
        </ContainerCard>
      </Link>
      <Link to="/interacao">
        <ContainerCard area={'Interacao'}>
         <FaRobot size={125}/>
        </ContainerCard>
      </Link>      
       <CardUser 
       src={user.image_aluno?`data:image/png;base64,${user.image_aluno}`
       :avatar}/>      
    </ContainerMenu>
  )
}
