import styled from 'styled-components'



export const InteracaoStyles = styled.div`
  
        display: flex;
        flex-direction: column;
        text-align: center;
        align-content: center;
        justify-content: center;
        align-items: center;
        justify-items: center;
        
  
`
export const DivCam = styled.div`
               
`

export const Camera  = styled.img`
               
`


export const AnimationComponent = styled.div`
        height:35%;
        width:35%;
        margin-bottom:2%;
`

export const Button = styled.button.attrs(props=>{

})`
        margin-top:2%;
        margin-left:auto;
        margin-right:2%;
        padding: 20px 20px;
        background-color:#A82DC9;
        border-radius:12px;
        cursor: pointer;
        box-shadow: 6px 6px 5px rgba(0,0,0,0.3);
        border-style:hidden;

        &:hover {
                background-color:#A82Db9;
        }
        &:active {
                background-color:white;
        }
          

`
export const ContainerButton = styled.div`
       
        display:flex;
        align-content:flex-end       
       
` 






