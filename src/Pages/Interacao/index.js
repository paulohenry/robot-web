import React ,{useState,useEffect,createRef} from 'react';


import { 
   InteracaoStyles,
   Button, 
   AnimationComponent,
   ContainerButton,
   DivCam,
   Camera
    } from './styles';

import {FaCogs } from 'react-icons/fa'

import recog from '../../Services/speechToText'
import {synth,utterance} from '../../Services/textToSpeech'


import lottie from '../../Config/Animations/animationConfig'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3001')



function Interacao() { 
  
  //variaveis de animacao
  const container  = createRef(null)

  //variaveis de captura de image
  const [camState, setCamState]=useState(false)
  const [tagcamera, setTagcamera] = useState('reconhecer_imagem')  
  const [srcImage, setSrcImage] = useState(null)
  const [recogState, setRecogState] = useState(false)
  const [buttonLabel, setbuttonlabel]=useState('iniciar gravação')
  
  io.on('data',(data)=>{      
      setSrcImage(`data:image/jpeg;base64,${data}`)
  })
  
  const dialogo = ()=>{
  recog.onresult = (e)=>{ 
      
     let transcricaoAtual = e.resultIndex
      let transcricao = e.results[transcricaoAtual][0].transcript
       
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

const handleRecog = ()=>{
  if(recogState===false){
    recog.start()
    setRecogState(true)
    setbuttonlabel('parar gravação')
  }else if(recogState===true){
    recog.stop()
    setRecogState(false)
    setbuttonlabel('iniciar gravação')
  } 
}

useEffect(()=>{
    
    dialogo()
    lottie.animacao_piscando(container)
   
},[])

return (
   <>
    <ContainerButton>
    <Button>  
      <a href='/dashboard'>
        <FaCogs color='#44c2d4' size={100}/>       
      </a>      
    </Button>      
  </ContainerButton>  
    <InteracaoStyles >
      <DivCam>        
         {camState===true && <Camera  src={srcImage}></Camera>}             
      </DivCam>
      <AnimationComponent className="container" ref={container}></AnimationComponent> 
     <Button onClick={()=>handleRecog()}>
       {buttonLabel}
     </Button>

    </InteracaoStyles>
   </>
    

  );
}

export default Interacao;
