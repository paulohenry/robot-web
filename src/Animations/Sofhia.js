import React from 'react'
import {ContainerCoruja,ContainerCorujaMae,ContainerCorujaMob} from './style'
import { SpriteAnimator } from 'react-sprite-animator'
import sprite from './animation/spritesheet10.png'
import spriteFalando from './animation/spritesheet10.png'


export const SofhiaPiscandoSprite = props =>{
  return(
    
    <ContainerCoruja>
          {props.falando?
             (<SpriteAnimator
                  id="test-id"
                  sprite={sprite}
                  width={640}
                  height={482}
                  fps={10}
                  scale={0.62}
                  direction='vertical'
                  wrapAfter={10}      
                  />):
              ( <SpriteAnimator
                  id="test-id"
                  sprite={spriteFalando}
                  width={640}
                  height={482}
                  fps={10}
                  scale={0.62}
                  direction='vertical'
                  wrapAfter={10}      
                  />)
                }
   </ContainerCoruja>                  
      
  )
}





