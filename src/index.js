import './style.css'
import gsap, {Power2} from 'gsap'
import barba from '@barba/core'
import {intro_main} from './trigger'
import {makeScrollbar, isMobile} from './scrollbar'

// Elems
const timeElem = document.querySelector('.time-wrapper')
const visualElems = document.querySelector('.visual-wrap')

let pageName = 'main'
let mainElem

// Camera Move
const cameraMove = function(e){
    const x = (window.innerWidth / 2 - e.clientX) * 0.003
    const y = (window.innerHeight / 2 - e.clientY) * 0.003

    gsap.to(mainElem,1,{
        x:`${x}vw`,
        y:`${y}vh`,
        ease:Power2.easeOut
    })

    gsap.to(visualElems, {
        boxShadow:`${x*5}px ${y*5}px 50px 35px rgb(0, 0, 0, 0.6)`
    })
}

// Time Control
let sec = 0;
let min = 0;
let hour = 0;
function formatText(t){
    if(Math.floor(t / 10) === 0){
        return `0${t}`
    }else{
        return t
    }
}

function setTime(){
    sec ++
    if(sec === 60){
        min ++
        sec = 0
    }
    
    if(min === 60){
        hour ++
        min = 0
    }

    timeElem.innerHTML = `${formatText(hour)}:${formatText(min)}:${formatText(sec)}`
}

setInterval(setTime, 1000)

// Default transition
function defaultLeave(e){
    return gsap.to(e.current.container, .5, {
        opacity:0,
        ease:Power2.easeOut
    })
}

function defaultEnter(e){
    if(isMobile){
        window.scroll(0,0)
    }         
    gsap.set(e.next.container, {opacity:0})
    const tl = gsap.timeline()
    tl.to(e.next.container, .5, {
        opacity:1,
        ease:Power2.easeIn
    })
    mainElem = e.next.container.querySelector('#scroll-wrap')
    
    if(!isMobile){
        gsap.delayedCall(0.5, () => window.addEventListener('mousemove', cameraMove))
    }
    gsap.delayedCall(0.5, makeScrollbar, [pageName])
}

barba.init({
    debug:true,
    transitions:[
        {
            name:'default',
            leave(e){
                return defaultLeave(e)
            },
            once(e){
                return defaultEnter(e)
            },
            enter(e){
                return defaultEnter(e)
            }
        }
    ],
    views:[
        {
            namespace:'index',
            beforeEnter(){
                pageName = 'main'
            }
        },
        {
            namespace:'feature',
            beforeEnter(){
                pageName = 'feature'
            }
        }
    ]
})
