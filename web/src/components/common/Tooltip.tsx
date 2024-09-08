import { useEffect, useRef } from "react"

export default function Tooltip({
    title,
    className='', 
    children
} : {
    title      : string,
    className? : string, 
    children   : any
}) {

    return (
        <div className={`relative z-50 pointer-events group/tooltip ${className}`}>
            {children}
            <Text title={title} />
        </div>
    )
}


function Text({
    title
} : {
    title : string
}) {

    const { innerRef, outerRef } = useTooltipBoundary()

    return (
        <div 
            ref={outerRef}
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-[9999] bottom-full group-hover/tooltip:bottom-[calc(100%+20px)] text-bg text-xs transition-all delay-700 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 min-w-max" 
        >
            <span 
                ref={innerRef}
                className="relative z-10 px-4 py-2 rounded bg-primary-dark/95 font-medium tracking-wider"
            >
                {title}
            </span>

            <div className="absolute left-1/2 -translate-x-1/2 -z-10 bottom-[-10px] w-[10px] h-[10px] rotate-45 bg-primary-dark/95 rounded-sm" />
        </div>
    )
}


function useTooltipBoundary() {

    const outerRef = useRef<HTMLDivElement>(null)
    const innerRef = useRef<HTMLSpanElement>(null)

    useEffect( () => {
        if( innerRef.current instanceof HTMLElement && outerRef.current instanceof HTMLElement ) {
    
            const outerRect = outerRef.current.getBoundingClientRect()
            const left = outerRect.left
            const right = window.innerWidth - outerRect.right
    
            if( left < 20 ){
                innerRef.current.style.left = `${Math.abs(left) + 10}px`
            }
            
            if( right < 20 ){
                innerRef.current.style.left = `-${Math.abs(right) + 20}px`
            }
    
        }
    }, [])

    return { innerRef, outerRef }
}