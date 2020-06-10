const synthVoice = (text)=> {
  const synth = window.speechSynthesis;
 
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance); 
}   


export default synthVoice