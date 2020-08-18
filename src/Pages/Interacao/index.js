
import React ,{useState,useEffect,useRef} from 'react';
import {SofhiaPiscandoSprite} from '../../Animations/Sofhia'
import { Offline, Online } from "react-detect-offline";
import { FaCogs, FaPowerOff, FaWifi } from 'react-icons/fa'
import Webcam from 'react-webcam'
import recog from '../../Services/speechToText'
import {synth,utterance} from '../../Services/textToSpeech'
import axios from '../../Services/axios'
import './style.css'
import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3002')

const constrains={
  height:425,
  width:425,
  facingMode:"user"    
}
function Interacao() { 
    
  const [camState, setCamState]=useState(false)  
  const camRef = useRef()
  
  recog.addEventListener('end', recog.start)

  const dialogo = ()=>{
  recog.onresult = (e)=>{       
     let transcricaoAtual = e.resultIndex
      let transcricao = e.results[transcricaoAtual][0].transcript
       console.log(transcricao)
        io.emit('message client',{
          autor:'usuário',
          fala:transcricao,          
        })                 
  }
  
  io.on('message bot', (socket)=>{
     socket.camera===true? setCamState(true) : setCamState(false) 
     utterance.text = socket.fala      
     synth.speak(utterance)     
     console.log(socket)     
  }) 
  
} 


const shutdown = async()=>{
    await axios.get('/shutdown')
  }

  useEffect(()=>{      
      recog.start() 
      dialogo() 
       return ()=>{
         recog.abort()
       }
  },[])

return (
    
    <div>
      <Offline className="offlineContainer">
           <a href='/wifi'>             
               <button className="b-off">
                 <FaWifi size={200}/>
                </button>
            </a>
          <p className="rede">conectar-se a uma rede</p>
      </Offline>
      <Online> 
          <button className="poweroff" onClick={()=>{shutdown()}}>
                 <FaPowerOff size={100}/>
          </button>        
          <a href='/wifi'>             
            <button className="wifi">
              <FaWifi size={100}/>
            </button>                    
          </a>
          <a href='/details'>             
            <button className="details">
              <FaCogs size={100}/>
            </button>                    
          </a>  
          <div className="online"><p>online</p></div>        
        <div className="sofy">
          {camState===true &&  
          <>        
            <Webcam 
                screenshotFormat = "image/jpeg"
                ref={camRef}
                className="olho1"
                mirrored="true" 
                videoConstraints={constrains}/>
            <Webcam 
                screenshotFormat = "image/jpeg"
                ref={camRef}
                className="olho2"
                mirrored="true" 
                videoConstraints={constrains}/> </>         
           }              
          <SofhiaPiscandoSprite/>          
        </div>
        </Online>
     </div>
    
  );
}

export default Interacao;
