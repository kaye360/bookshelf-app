import { useState, useRef, useEffect } from "react"
import { infiniteCommunityPosts } from "../api/getCommunityPost"
import { CommunityPost } from "../../../types/types"
import useIntersectionObserver from "../../../hooks/useIntersectionObserver"

export default function useInfiniteCommunityPosts() {

    /**
     * Intersection observer to determine when user is at the end of page
     * and fire updatePosts()
     */
    const { containerRef, isVisible } = useIntersectionObserver({
        root : null,
        rootMargin : '0px',
        threshold : 1
    })

    /**
     * Current page
     * pageHistory tracks which pages have loaded to prevent loading the
     * same page multiple times
     */
    const [page, setPage] = useState<number>(1)
    const pageHistory = useRef<number[]>([])

    /**
     * Community posts
     */
    const [posts, setPosts] = useState<CommunityPost[][]>([])
    const [hasPosts, setHasPosts] = useState<boolean>(true)

    /**
     * Update community post function
     */
    async function updatePosts() {
        if( pageHistory.current.includes(page) ) return
        pageHistory.current.push(page)

        const newPosts = await infiniteCommunityPosts(page)

        if( newPosts.length === 0 ) {
            setHasPosts(false)
        } else {
            setPosts(prev => [...prev, ...newPosts])
        }
    }

    /**
     * Track when user has reached the end of the page and update the posts
     */
    useEffect( () => { 
            updatePosts()
    }, [page])

    useEffect( () => {
        if( isVisible ) {
            setPage(prev => prev + 1)
        }
    }, [isVisible])

    
    return {
        posts, hasPosts, containerRef
    }
}
