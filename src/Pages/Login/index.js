import React,{useEffect,useState} from 'react'
import { Offline, Online } from "react-detect-offline";
import { FaWifi } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import BlockUsers from '../../Components/BlocoLogin/index'
import axios from '../../Services/axios'
import Loading from '../../Components/loading/loading'
import './styles.css'
export default function Login() {

  const [loading, setLoading] = useState(true)
  const [users,setUsers]=useState([])
  const [error, setError]=useState(false)
  
  const getAllUsers = async()=>{
    try{
    const response = await axios.get('/all-users')
    console.log(response.data.data) 
    setLoading(false)
    setUsers(response.data.data)
    localStorage.setItem('currentDatas',JSON.stringify([]))  
    }catch(error){
      setError(true)
      setLoading(false)
    }  
  }

  useEffect(()=>{
      getAllUsers()
    },[])

  const getSelectDatas = (user)=>{
    console.log(user)
    localStorage.setItem('currentDatas', JSON.stringify(user)) 
      
  }
  return (
    <>
    <Offline className="offlineContainer">
           <Link to='/wifi' style={{ textDecoration: 'none' }}> 
                    
               <button className="b-off">
                 <FaWifi size={200}/>
                </button>
            </Link>
          <p className="rede">conectar-se a uma rede</p>
      </Offline>
      {!error?
      <Online > 
      <div className="onlineContainer">      
       <h1 className={navigator.plataform==='Linux armv7l'?"titulo-mob":"titulo"}> 
       Escolha seu Robo para começar a usar</h1>     
          {!loading && users.length>0?users.map((user)=>{
            console.log(user)
            return( 
              <Link to="/menu" style={{ textDecoration: 'none' }}>
              <div className="card" key={user.id}>
               <BlockUsers
                   imgAluno={user.image_aluno}
                   imgRobot={user.image_robot}
                   nomeAluno={user.nome_aluno}
                   nomeRobot={user.nome_robot}
                   catchAndLog={()=>{getSelectDatas(user)}}
                  />
              </div>  
              </Link> 
              )
          }):(loading?<Loading/>:<h1 className={navigator.plataform==='Linux armv7l'?"titulo-mob":"titulo"}>Nenhum usuário cadastrado</h1>)
          } 
          </div>
      </Online>:(
        <>
      <Link to='/wifi'>           
               <button className="b-off">
                 <FaWifi size={200}/>
                </button>
            </Link>
     <p className="rede">conectar-se a uma rede</p>
     </>
     )}
    </>
  )
}
