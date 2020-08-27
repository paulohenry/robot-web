import React from 'react'
import {Container,ContainerAluno,ContainerRobot}from './style'
import avatar from '../../Assets/avatar.jpg'
const BlockUsers= props => {
  return (
    <Container  onClick={(e)=>props.catchAndLog(e)}>
       <ContainerAluno>
        <img src={props.imgAluno?`data:image/png;base64,${props.imgAluno}`:avatar}/>
        <h1>{`Treinador: ${props.nomeAluno}`}</h1>
       </ContainerAluno>
       <ContainerRobot>
        <img src={props.imgAluno?`data:image/png;base64,${props.imgRobot}`:avatar}/>
        <h1>{`Robô: ${props.nomeRobot}`}</h1>
       </ContainerRobot>
    </Container>
  )
}

export default BlockUsers
