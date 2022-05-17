import gsap, {Power2} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import { scroll_element, isMobile } from '../../scrollbar'

export default function feature(){
    const featureContent = document.querySelectorAll('.feature-content')
    
    gsap.utils.toArray(featureContent).forEach(function(content){
        const viusalWrap = content.querySelector('.visual-wrapper')
        const containerWrap = content.querySelector('.container-wrap')
        
        ScrollTrigger.create({
            scroller:scroll_element,
            trigger:content,
            start:'top top',
            end:'bottom bottom',
            pin:viusalWrap
        })
        const textWrapElems = content.querySelectorAll('.text-wrap')
        const textArr = []
        gsap.utils.toArray(textWrapElems).forEach(function(textWrap, i){
            const sx = isMobile ? 0 : textWrap.dataset.sx * 1
            let sy = textWrap.dataset.sy * 1
            if(isMobile && sy === 0){
                const pn = i%2 === 0 ? -1 : 1
                sy = 10 * pn
            }
            const texts = textWrap.querySelectorAll('.text-outer div')
            gsap.set(texts, {y:'100%', opacity:0})
            gsap.set(textWrap, {x:`${sx}vw`, y:`${sy}vh`})

            textArr[i] = texts
        })

        gsap.to(textArr[0], 0.5, {
            scrollTrigger:{
                scroller:scroll_element,
                trigger:content,
                start:`top top`,
                end:'20% top',
                toggleActions:'play none reverse none'
            },
            y:0,
            opacity:1,
            stagger:0.3,
            ease:Power2.easeOut,
            startAt:{
                y:'100%',
                opacity:0
            },
            onComplete:function(){
                gsap.to(textArr[0], 0.4, {
                    scrollTrigger:{
                        scroller:scroll_element,
                        trigger:content,
                        start:`45% top`,
                        toggleActions:'play none none reverse',
                    },
                    y:'-100%',
                    opacity:0,
                    stagger:0.2,
                    ease:Power2.easeOut,
                    startAt:{
                        y:0,
                        opacity:1
                    },
                })
            }
        })
        
        gsap.to(textArr[1], 0.5, {
            scrollTrigger:{
                scroller:scroll_element,
                trigger:content,
                start:`40% top`,  
                toggleActions:'play none none reverse'
            },
            y:0,
            opacity:1,
            stagger:0.3,
            ease:Power2.easeOut,
            startAt:{
                y:'100%',
                opacity:0
            },
            onComplete:function(){
                gsap.to(textArr[1], 0.4, {
                    scrollTrigger:{
                        scroller:scroll_element,
                        trigger:content,
                        start:`70% top`,
                        toggleActions:'play none none reverse',
                    },
                    y:'-100%',
                    opacity:0,
                    stagger:0.2,
                    ease:Power2.easeOut,
                    startAt:{
                        y:0,
                        opacity:1
                    },
                })
            }
        })

        ScrollTrigger.create({
            scroller:scroll_element,
            trigger:content,
            start:`top top`,
            end:'bottom bottom',
            pin:containerWrap,
        })

        const visual = viusalWrap.querySelector('.visual-wrap')
        gsap.to(visual, {
            scrollTrigger:{
                scroller:scroll_element,
                trigger:visual,
                start:'top bottom',
                end:'center center',
                scrub:2,
            },
            startAt:{scale:0.9, opacity:0},
            scale:1,
            opacity:1
        })  
    })

}