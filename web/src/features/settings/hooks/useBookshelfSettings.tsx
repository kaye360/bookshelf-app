import { useState } from "react"
import { BookshelfViews, BookshelfFilters, BookshelfSorts } from "../../bookshelf/types/types"
import { useAuth } from "../../auth/hooks/useAuth"


interface BookShelfSettingsProps {
    isTouched : boolean
    touchForm : () => void
}


export default function useBookshelfSettings({ isTouched, touchForm } : BookShelfSettingsProps) {

    const { user } = useAuth()

    const [view, setView]     = useState<BookshelfViews>(user?.settings?.view || 'grid')
    const [filter, setFilter] = useState<BookshelfFilters>(user?.settings?.filter || 'all')
    const [sort, setsort]     = useState<BookshelfSorts>(user?.settings?.sort || 'title')
    
    function handleClick( setting : 'view', value : BookshelfViews) : void
    function handleClick( setting : 'filter', value : BookshelfFilters) : void
    function handleClick( setting : 'sort', value : BookshelfSorts) : void

    function handleClick( setting: 'view' | 'filter' | 'sort', value : BookshelfViews | BookshelfFilters | BookshelfSorts ) {

        if( !isTouched ) {
            touchForm()
        }

        switch (setting) {
            case 'view': 
                setView(value as BookshelfViews)
                break
            case 'filter':
                setFilter(value as BookshelfFilters)
                break
            case 'sort':
                setsort(value as BookshelfSorts)
        }
    }
    
    return {
        view, filter, sort, handleClick
    }
}
