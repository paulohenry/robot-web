import React ,{useEffect,createRef} from 'react';
import './App.css';

import recog from './Services/speechToText'
import voice from './Services/textToSpeech'

import lottie from 'lottie-web'



import assistant from './Animations/assistant-animation.json'

import socketio from 'socket.io-client'
const io = socketio.connect('http://localhost:3001')




function App() {
 
  
  const container  = createRef(null)

  let anim = {
    lotie:()=> {lottie.loadAnimation({
    animationData: assistant,
    renderer:'svg',
    container:container.current,
    loop:false, 
  })},
    lotiePlay:()=> lottie.play(),
    lotieDestroy:()=> lottie.destroy()
}
 


  const comandoDeVoz =()=>{
 
  let h = recog.onresult = (e)=>{
      
      let transcricaoAtual = e.resultIndex
      let transcricao = e.results[transcricaoAtual][0].transcript
      
      io.emit('message client',{
        autor:'usuário',
        fala:transcricao
      })
      
  }
  
  io.on('message bot', (socket)=>{
     anim.lotieDestroy()
     anim.lotie()
     voice(socket.fala)
     console.log({
       dialogoCompleto:socket.dialogoCompleto,
      respostaCompleta:socket.respostaCompleta})
     
     
  })
  
}
    const falseFunc = ()=>{

    }
    
    recog.addEventListener('end', recog.start); 
  


useEffect(()=>{
  recog.start()
  comandoDeVoz()
  anim.lotie()
  
  
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
