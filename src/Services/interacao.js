import axios from '../Services/axios'

 export default{
    interacao:async(ra,ibm_api_key,ibm_url,ibm_assistant_id,transcricao,continu)=>{
      console.log(ra,ibm_api_key,ibm_url,ibm_assistant_id,transcricao,continu)
 try{
   const response = await axios.post('/interacao', {
        ra:ra,
        transcricao_robot:transcricao,
        ibm_api_key:ibm_api_key,
        ibm_url:ibm_url,
        continu:continu,
        ibm_assistant_id:ibm_assistant_id          
  }) 
  return response   
  }catch(error){
    console.log(error)
   return error
  }
 }
}