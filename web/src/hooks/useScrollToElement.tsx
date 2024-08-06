import { useRef } from "react"

export default function useScrollToElement() {

    const scrollRef = useRef<HTMLElement|null>(null)

    const scrollTo = () => scrollRef.current?.scrollIntoView({
        behavior : "smooth"
    })

    return { scrollRef, scrollTo }
}
