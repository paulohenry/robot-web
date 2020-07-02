import lottie  from 'lottie-web'
import falando from '../../Animations/corujafalando.json'
import piscando from '../../Animations/corujapiscando.json'

const animacao_falando = (container)=> lottie.loadAnimation({
    animationData: falando,
    renderer:'svg',
    container:container.current,
    loop:true, 
})

const animacao_piscando = (container)=> lottie.loadAnimation({
    animationData: piscando,
    renderer:'svg',
    container:container.current,
    loop:true, 
})

export default {
    animacao_falando,
    animacao_piscando
}



