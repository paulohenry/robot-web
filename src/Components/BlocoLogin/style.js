import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    border-radius:6px;
    background-color:#5c9ed8;
    padding-bottom:5vh;
    box-shadow: 0px 0px 6px 6px rgba(0,0,0,0.3);
       &:active{
      background-color:#71ABDD; 
    }

 
`; 

export const ContainerAluno = styled.div`
   display:flex;   
   align-items:center;
   padding:4vh 0 5vh 5vw;
   & > img{
      height:auto;
      max-height:20vh;
      width:auto;
      max-width:20vw;
      border-radius:50%;      
    }
    & > h1{
      color:#FFF;
      margin-left:30px;
    }
`;

export const ContainerRobot= styled.div`
   display:flex;   
   align-items:center;
   padding:0 0 5vh 5vw;
   & > img{
    height:auto;
      max-height:20vh;
      width:auto;
      max-width:20vw;
      border-radius:50%;      
    }
    & > h1{
      color:#FFF;
      margin-left:30px;
    }
`;