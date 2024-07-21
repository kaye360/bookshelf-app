import { useRef } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "../../../components/common/Icon"

export default function Slider({
    children
}: {
    children: any
}) {

    const scrollerRef = useRef<HTMLDivElement>(null)
    const scrollPos = useRef<number>(0)

    function handleScroll(direction : 'left' | 'right') {

        if( !scrollerRef.current ) return

        const scrollAmount = window.innerWidth - 100
        const max = scrollerRef.current.scrollWidth - scrollerRef.current.clientWidth

        scrollPos.current = direction === 'left' 
            ? scrollPos.current - scrollAmount
            : scrollPos.current + scrollAmount

        if( scrollPos.current < 100 ) {
            scrollPos.current = 0
        }

        if( scrollPos.current > max ) {
            scrollPos.current = max
        }
        
        scrollerRef.current.scroll({
            left : scrollPos.current,
            behavior : 'smooth'
        })
    }

    return (

        <div className="relative">
                
            <button
                onClick={() => handleScroll('left')}
                className="hidden md:block absolute -left-2 top-0 bottom-0 px-1 z-50 bg-bg rounded-md hover:outline hover:outline-1 hover:outline-primary-light"
            >
                <ArrowLeftIcon />
            </button>
            <button
                onClick={() => handleScroll('right')}
                className="hidden md:block absolute -right-2 top-0 bottom-0 px-1 z-50 bg-bg rounded-md hover:outline hover:outline-1 hover:outline-primary-light"
            >
                <ArrowRightIcon />
            </button>

            <div 
                ref={scrollerRef}
                className="flex gap-5 px-8 relative overflow-x-scroll md:scrollbar-hide"
            >
                {children}
            </div>

        </div>
    )
}
