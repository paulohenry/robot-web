import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {FaArrowLeft} from 'react-icons/fa'
export const Container = styled.div`
   margin:0;
   padding:0;
   outline:0;
   box-sizing: border-box;
   flex-direction:column;
   display:flex;
   height:100vh;
   width:100vw;
   position:relative;
   align-items:center;
   padding-top:10vh;

   & > p{
      color:#FFF;
    font-weight:bold;
    font-size:2rem;
    margin-bottom:4vh;
   }
   
   
    min-height:100vh;
    -webkit-font-smoothing: antialiased !important;
    overflow-y: scroll;
    overflow-x:hidden;
    height:100vh;  
    width: 100vw;  
  
    
    &::-webkit-scrollbar{
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
`;

export const Voltar = styled(Link)`
    height:10vh;
    width:5vw;
    border:none;
    border-radius:5%;
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    left:3vw;
    top:4vh;
    background-color:#71ABDD;
    box-shadow: 0px 0px 6px 6px rgba(0,0,0,0.2);
`;

export const IconVoltar = styled(FaArrowLeft)`
    flex: 1;
    height:100%;
    width:100%;
    color:#FFF;
`

export const BlockWifi = styled.div`
      display:flex;
      position:relative;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      border-radius:6px;
      border:none;
      height:80vh;
      width:80vw;
      
      padding:5vh 0 5vh 0;
      margin-bottom:3vh;
      box-shadow:3px 3px 6px 3px rgba(0,0,0,0.2);

      & > p{
        color:#FFF;
        font-weight:bold;
        font-size:1.5rem;
        
      }
      
      &>input{
        width:100%;
        padding:2vh 0 2vh 1vh;
        border-radius:6px;
        border:1px solid gray;
        font-style:italic;
        font-size:1rem;
      }
      &:hover ,:active{
        cursor:pointer;
        background-color:#5c9ed8;
      }

`;
