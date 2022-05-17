import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
import { init_trigger, setPageName, setLoaded } from './trigger'

let isMobile = false

if(navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null){
    isMobile = true;
    window.scrollTo(0,0)

}

// Register Plugin
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" // notice "resize" isn't in the list
});
let scroll_element = '.scroller-proxy'
if(isMobile) scroll_element = document
export {scroll_element, isMobile}

const faceDirElem = document.querySelector('.face-dir')

// Smooth Scroll
export function makeScrollbar(pageName, resize){
    if(!isMobile){
        const scroller = document.querySelector(scroll_element)
        
        const bodyScroller = Scrollbar.init(scroller, {
            damping:0.1,
            delegateTo:document
        })
    
        bodyScroller.setPosition(0, 0)
        setFaceDir()
        
        bodyScroller.track.xAxis.element.remove()
        bodyScroller.track.yAxis.element.remove()
        
        setPageName(pageName)
        setLoaded(false)
        bodyScroller.addListener(init_trigger)
        bodyScroller.addListener(setFaceDir)
        bodyScroller.addListener(ScrollTrigger.update)
        // Face Dir control
        function setFaceDir(){
            const maxScroll = ScrollTrigger.maxScroll(document.querySelector(scroll_element))
            const ratio = maxScroll === window.innerHeight ? 0 : bodyScroller.scrollTop / (maxScroll)
        
            gsap.to(faceDirElem, 0.5, {
                left:`calc(${ratio * 100}% - 1px)`,
            })
        }
        
        ScrollTrigger.scrollerProxy(scroller, {
            scrollTop:function(v){
                bodyScroller.scrollTop = v
                return bodyScroller.scrollTop
            }
        })
    } else{
        function setFaceDir(){
            const maxScroll = ScrollTrigger.maxScroll(document)
            const ratio = maxScroll === window.innerHeight ? 0 : window.pageYOffset / (maxScroll)
        
            gsap.to(faceDirElem, 0.5, {
                left:`calc(${ratio * 100}% - 1px)`,
            })
        }
        window.addEventListener('scroll', setFaceDir)
        
        window.scroll(0, 0)
        setPageName(pageName)
        setLoaded(false)
        init_trigger()
    }
}
