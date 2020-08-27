import React,{useEffect,useState} from 'react';
 import {Container, Voltar, IconVoltar, BlockWifi, ContainerKeyboard} from './style'
import axios from '../../Services/axios'
import Loading from '../../Components/loading/loading'

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const Wifi  = ()=> {
  
  const [listWifi, setListWifi]=useState([])
  const [loading, setLoading]=useState(true)
  const [loadingConnect, setLoadingConnect]=useState(false)
  const [layout, setLayout] = useState("default");
  const [conectado, setConectado] = useState('azul')
 

  const getWifi = async()=>{
    const res = await axios.get('/list-wifi')
    const newData = transformArray(res.data)
    setListWifi(newData)
    setLoading(false)
  }
  const transformArray = (array)=>{
      let newArray = []
      array.map((item,index)=>{
        newArray.push({
          ssid:item.ssid,
          show:false,
          password:''
        })
      })
      console.log(newArray)
      return newArray
  }
 
  const showInput = (e,wifi,index)=>{
    setConectado('azul')    
      let newArray = []
      listWifi.map((wifi_,index_)=>{
        if(index_===index){
            return(
              newArray.push({
                ssid:wifi_.ssid,
                show:true,
                password:wifi_.password
              })
            )
        }else{
          return(
            newArray.push({
              ssid:wifi_.ssid,
              show:false,
              password:''
            })
          )
        }        
      })
      setListWifi(newArray)
  }
  const changeInput =(input,wifi,index)=>{
      
      let newArray=[]
      listWifi.map((_wifi,_index)=>{
        if(_index===index){
          return(
            newArray.push({
              ssid:wifi.ssid,
              show:wifi.show,
              password:input
            })
          )
        }else{
          return(
            newArray.push({
              ssid:_wifi.ssid,
              show:false,
              password:''
            })
          )
        }
      })
     setListWifi(newArray)
  }
  const connectWifi =async(ssid,password)=>{
    setLoadingConnect(true)
    try{
      const responseConnect = await axios.post('/connect',{
        ssid:ssid,
        senha:password
      })
      setConectado('verde')
      setLoadingConnect(false)
      return responseConnect.status
    }catch(error){    
      setLoadingConnect(false)  
      setConectado('vermelho')
      return error
      
  }
}
  const onKeyPress = (button)=>{    
    
    if (button === "{shift}" || button === "{lock}") handleShift();
  
    if (button === "{enter}" || button === "{lock}") {
        
        listWifi.map(wifi=>{
          if(wifi.show==true){                                
              const response = connectWifi(wifi.ssid,wifi.password)                                     
           }
        })
       
    };
  }
  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };
  useEffect(()=>{
    getWifi()
  }
  ,[])
  return (
    <>
    <Container>
      <Voltar to="/menu">
        <IconVoltar/>      
      </Voltar>
      
      <p>Escolha uma rede wifi para se conectar</p>
      {!loading?listWifi.map((wifi,index)=>{
        return(
          <BlockWifi onClick={(e)=>showInput(e,wifi,index)} key={index}>
            <p>{wifi.ssid}</p>   
            {wifi.show &&
            <>
           {conectado==='verde' && <p style={{color:'#30CE0C'}}>conectado com sucesso</p>}
           {conectado==='vermelho'&& <p style={{color:'#FB042C'}}>falha na conexão</p>}   
              <input placeholder="Digite a senha da rede wifi"  
                value={wifi.password}/>
                <Keyboard
                  layoutName={layout}
                  onChange={(input)=>changeInput(input,wifi,index)}
                  onKeyPress={(button)=>onKeyPress(button)}/>
              {loadingConnect && <Loading/> }
            </>
            }     
          </BlockWifi>
        )
      }):<Loading/>}
               
    </Container>
    
    </>
  );
}

export default Wifi;
