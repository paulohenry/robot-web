import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  *{
      margin:0;
      padding:0;
      outline:0;
      box-sizing: border-box;
  }
 

  html, body, #root{
    background-color:#71ABDD;
    min-height:100%;
    -webkit-font-smoothing: antialiased !important;
    overflow-y:hidden;
    height:100vh;  
    width: 100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }


`