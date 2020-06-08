import React ,{useEffect,useRef} from 'react';
import './App.css';

import recog from './Services/speechToText'
import voice from './Services/textToSpeech'

import lottie from 'lottie-web'


import assistant from './Animations/assistant-animation.json'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3001')



recog.start()

function App() {

  const container  = useRef(null)

 const lotie = ()=>{ 
   lottie.loadAnimation({
    animationData: assistant,
    autoplay:true,
    container:container.current,
    loop:false,
    
  })
 
} 

  const comandoDeVoz =()=>{
 
  recog.onresult = (e)=>{
      
      let transcricaoAtual = e.resultIndex
      let transcricao = e.results[transcricaoAtual][0].transcript
   
      io.emit('message client',{
        autor:'usuário',
        fala:transcricao
      })
     
  }
  io.on('message bot', (socket)=>{
     voice(socket.fala)
     console.log(socket.fala)
  })
  
}
const falseFunc = ()=>{}

useEffect(()=>{
  comandoDeVoz()
  lotie()
})

  return (
    <div className="App">
      <h1>Primeira Versão beta Amigo Bot</h1>
      <div className="container" ref={container}>
        <button hidden={true} onClick={falseFunc}></button>
        
      </div>
            
    </div>
  );
}

export default App;
