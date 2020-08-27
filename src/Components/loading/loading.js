import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../../Animations/animation/loading.json'

const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,    
    rendererSettings:{
      preserveAspectRatio:'xMinYMin slice'
    }
}


const Loading = (props)=>{
  return(
    <>    
        <Lottie 
          options={loadingOptions}
          height={'100%'}
          width={'50%'}
          isStopped={false}
          isPaused={false}
          className={props.className}
          {...props}
          />
      
    </>
  )
}
export default Loading


