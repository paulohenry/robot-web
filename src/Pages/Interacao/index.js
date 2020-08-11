
import React ,{useState,useEffect} from 'react';
import {SofhiaPiscandoSprite} from '../../Animations/Sofhia'
import {Link}from 'react-router-dom'
import { 
   DivCam,
   Camera
    } from './styles';



import recog from '../../Services/speechToText'
import {synth,utterance} from '../../Services/textToSpeech'


import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3002')




function Interacao() { 
  
   
 
  //variaveis de captura de image
  const [camState, setCamState]=useState(false)
  const [tagcamera, setTagcamera] = useState('reconhecer_imagem')  
  const [srcImage, setSrcImage] = useState(null)
  // const [recogState, setRecogState] = useState(false)
  // const [buttonLabel, setbuttonlabel]=useState('iniciar gravação')
  
  io.on('data',(data)=>{      
      setSrcImage(`data:image/jpeg;base64,${data}`)
  })
  
  const dialogo = ()=>{
  recog.onresult = (e)=>{ 
      
     let transcricaoAtual = e.resultIndex
      let transcricao = e.results[transcricaoAtual][0].transcript
       console.log(transcricao)
        io.emit('message client',{
          autor:'usuário',
          fala:transcricao,
          tagcamera:tagcamera
        }) 
                
  }
  
  io.on('message bot', (socket)=>{
     socket.camera===true? setCamState(true) : setCamState(false) 
     utterance.text = socket.fala      
     synth.speak(utterance)     
     console.log(socket)   
     
  })
  
  } 



recog.addEventListener('end', recog.start)



useEffect(()=>{   
    recog.start() 
    dialogo()   
},[])

return (
    <> 
          
          {camState===true && <Camera  src={srcImage}></Camera>}             
        
      <Link to='/details'>         
         <SofhiaPiscandoSprite/>
      </Link>    
    </>   

  );
}

export default Interacao;
