import gsap, {Power2} from 'gsap'
import {scroll_element} from '../../scrollbar'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

export default function intro(){
    const introWrapper = document.querySelector('.intro-wrap')
    const contentElems = introWrapper.querySelectorAll('.content')
    const visuals = introWrapper.querySelectorAll('.visual-wrap')
    const textWraps = introWrapper.querySelectorAll('.text-wrap')

    // Contents
    gsap.utils.toArray(contentElems).forEach(function (content){
        const fixedText = content.querySelector('.fix--text')
        const endTrigger = content.querySelector('.end-trigger')

        ScrollTrigger.create({
            scroller:scroll_element,
            trigger:fixedText,
            endTrigger:endTrigger,
            start:'center center',
            end:'bottom bottom',
            pin:true,
            pinSpacing:false
        })
    })

    // Visuals
    gsap.utils.toArray(visuals).forEach(function(visual){
        gsap.set(visual, {scale: 0.9})
        gsap.to(visual, {
            scrollTrigger:{
                scroller:scroll_element,
                trigger:visual,
                start:'top bottom',
                end:'center center',
                scrub:1
            },
            scale:1,
            ease:Power2.easeOut
        })
    })

    // Texts
    gsap.utils.toArray(textWraps).forEach(function(textWrap){
        const texts = textWrap.querySelectorAll('.text-outer div')
        
        gsap.set(texts, {y:'100%'})

        ScrollTrigger.create({
            scroller:scroll_element,
            trigger:textWrap,
            start:'center bottom',
            onEnter:function(){
                gsap.to(texts, 0.8, {
                    y:0,
                    stagger:0.3,
                    ease:Power2.easeInOut
                })
            }
        })
    })
}