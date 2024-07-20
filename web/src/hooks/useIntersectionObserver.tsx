import { useEffect, useRef, useState } from "react"


export default function useIntersectionObserver(options : IntersectionObserverInit) {

    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    function cb( entries : IntersectionObserverEntry[] ){
        const [entry] = entries
        setIsVisible( entry.isIntersecting )
    }

    useEffect( () => {
        const observer = new IntersectionObserver(cb, options)
        if( containerRef.current ) observer.observe(containerRef.current)
        
        return () => {
            if( containerRef.current ) observer.unobserve(containerRef.current)
        }
    }, [containerRef, options])

    return {containerRef, isVisible}
}