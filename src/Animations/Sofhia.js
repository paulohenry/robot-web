import React from 'react'
import './style.css'


import { SpriteAnimator } from 'react-sprite-animator'
import sprite from './animation/spritesheet10.png'


export const SofhiaPiscandoSprite = props =>{
  return(
    <SpriteAnimator
      sprite={sprite}
      width={640}
      height={482}
      fps={8}
      scale={1}
      direction='vertical'
      wrapAfter={10} 
         
      />
  )
}





