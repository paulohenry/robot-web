import styled from 'styled-components';

export const ContainerMenu = styled.div`
      
      margin:0;
      padding:0;
      outline:0;
      box-sizing: border-box;
      
    
      min-height:100%;
      -webkit-font-smoothing: antialiased !important;
      overflow-y: hidden;
      overflow-x:hidden;
      height:100vh;  
      width: 100vw;   
      
      
      display:grid;
      grid-template-columns:1fr 1fr;
      grid-template-rows:1fr 1fr;
      grid-template-areas:
        "Login Info"
        "Interacao Wifi";
`;

  export const ContainerCard = styled.div`
      margin:5vh 10vw 0vh 10vw;
      padding:10vh 10vw 10vh 10vw;
      display:flex;
      color:#FFF;
      justify-content:center;
      align-items:center;
      grid-area:${props=>props.area};
      border-radius:6px;
      box-shadow:0px 0px 6px 6px rgba(0,0,0,0.1);
      background-color:#5c9ed8;
      &:hover{
        cursor:pointer;
      }
  `;

  export const CardUser = styled.img`
      position: fixed;
      top: 50%;
      left: 50%;
      /* bring your own prefixes */
      transform: translate(-50%, -50%);
      border-radius:50%;
      box-shadow:0px 0px 6px 6px rgba(0,0,0,0.1);
  `;