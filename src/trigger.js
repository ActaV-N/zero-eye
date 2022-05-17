import main from './main/intro'
import feature from './feature/intro'

let isLoaded = false
let pageName

export function setLoaded(loaded){
    isLoaded = loaded
}

export function setPageName(name){
    pageName = name
}

export function init_trigger(){
    if(!isLoaded){
        isLoaded = true

        const pages = ['main', 'feature']
        const pageIndex = pages.indexOf(pageName)
    
        const pageFunctions = [intro_main, intro_feature]
    
        pageFunctions[pageIndex]()
    }
}

export function intro_main(){
    main()
}

export function intro_feature(){
    feature()
}