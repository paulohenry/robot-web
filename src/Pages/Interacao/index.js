
import React ,{useState,useEffect,useRef} from 'react';

import {SofhiaPiscandoSprite} from '../../Animations/Sofhia'
import { Offline, Online } from "react-detect-offline";
import { FaCogs, FaWifi } from 'react-icons/fa'
import Webcam from 'react-webcam'
import Loading from '../../Components/loading/loading'
import recog from '../../Services/speechToText'
import {synth,utterance} from '../../Services/textToSpeech'
import interacao from '../../Services/interacao'
import axios from '../../Services/axios'
import * as tf from'@tensorflow/tfjs';
import * as mobilenetModule from'@tensorflow-models/mobilenet';
import * as knnClassifier from'@tensorflow-models/knn-classifier/dist/knn-classifier';

import './style.css'

let mobilenet=null;
let classifier=null;

let interval = null

const constrains={
  height:425,
  width:425,
  facingMode:"user"    
}
function Interacao() { 
  const [loading,setLoading] = useState(true)
  const [camState, setCamState]=useState(false)  
  const [falando, setFalando]=useState(false)
  const camRef = useRef()
  const [ligouCam,setLigouCam]=useState(false)
  const [datas, setDatas]=useState([])
  const [continu2, setContinu2]=useState(false)
  const [predictClass, setPredictClass]=useState(null)
  recog.addEventListener('end', recog.start)
   
  recog.onresult = async(e)=>{ 
      let transcricaoAtual = e.resultIndex        
      let transcricao = e.results[transcricaoAtual][0].transcript      
      const {ra,ibm_api_key,ibm_url,ibm_assistant_id } = datas
        try{
      let response = await interacao.interacao(ra,ibm_api_key,ibm_url,ibm_assistant_id,transcricao,continu2)
      if(response.data.continu===true){
        setContinu2(true)
      }else if(response.data.continu===false){
        setContinu2(false)
      }
      if(response.data.camera===true){
        setCamState(true)
        setLigouCam(true)
      }else{
          setCamState(false) 
          
      }
      
      utterance.text = response.data.transcricao_robot 
      recog.abort() 
      synth.speak(utterance)      
      if(synth.speaking)
      { 
        setFalando(true)
        recog.start()
      }else{
        setFalando(false)
      }   
    }catch(error){
     
    
    }
      
            
   }
   
  const loadDatas = async()=>{
    const {ra} = JSON.parse(localStorage.getItem('currentDatas'))
    const user = await axios.post(`http://localhost:3002/unique-user`,{ra:ra})
    if(user.data.data[0].ra===ra){
      setDatas(user.data.data[0])
      setLoading(false)
    }
    
  }


  const fromDatasetObject = (datasetObject)=>{
    let res =  Object.entries(datasetObject).reduce((result, [_, {classId, data, shape}]) => {
      const tensor = tf.tensor2d(data, shape);
      result[classId] = tensor;  
      console.log('interacao',datasetObject)
      console.log(result)
      return result;
    }, {})     
    return res    
  }


  const test = async()=>{     
    if(camRef.current){   
      
  if(camRef.current.video && ligouCam===false){
    console.log('entrou load video',ligouCam)     
      
      setPredictClass('carregando')  
      
      
  }else if(camRef.current.video  && predictClass){
    
    const img =  tf.browser.fromPixels(camRef.current.video)
    const  xlogits = mobilenet.infer(img,'conv_preds');
    try{
      
      const predict1 = await classifier.predictClass(xlogits,30)
      setPredictClass(predict1.label)
      utterance.text = predict1.label       
      synth.speak(utterance) 
      
    }catch(error){
      console.log(error)
    }       
  }else{
    console.log('repetindo aguardando')
    setPredictClass('carregando')
  }
    }else{
      setPredictClass('')
      clearInterval(interval)
      
    }
}


const loadTensors = async()=>{
  mobilenet = await mobilenetModule.load({
    version:2,
    alpha:1.0
  })   

  const {ra} = JSON.parse(localStorage.getItem('currentDatas'))
  const user = await axios.post(`http://localhost:3002/unique-user`,{ra:ra})
  console.log(user)
  if(user.data.data[0].knn_model){ 
    console.log('de certo knn')
    classifier = knnClassifier.create()         
    const dataset = fromDatasetObject(JSON.parse(user.data.data[0].knn_model));
   classifier.setClassifierDataset(dataset);          
  }else{
    classifier = knnClassifier.create() 
  }    
}

useEffect(()=>{
  const interval = setInterval(()=>{
    test()
  },3000) 
  return ()=> clearInterval(interval)       
},[predictClass])

  useEffect(()=>{  
      loadTensors()
      loadDatas()
      console.log(camRef)          
      if(navigator.plataform!=='Linux armv7l')
        {recog.start()}       
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
      <Online> <>
        {!loading?<><a href='/menu'>             
            <button className="details">
              <FaCogs size={100}/>
            </button>                    
          </a> 

          <div className="online"><p>online</p></div>        
        <div className="sofy">
          {camState===true &&  
          <>  
            <h1 className="titlePredict">{predictClass===null?'':`${predictClass}`}</h1>      
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
          <SofhiaPiscandoSprite falando={falando}/>          
        </div></>:<Loading/>}</>
        </Online>
     </div>
    
  );
}

export default Interacao;
