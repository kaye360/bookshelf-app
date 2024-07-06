import { useState } from "react"
import { useStore } from "../../../store/store"
import { UserSettings } from "../../../types/types"


export default function useBookshelfSettings({
    isTouched, 
    touchForm 
} : {
    isTouched : boolean
    touchForm : () => void
}) {

    const { settings } = useStore()

    const [view, setView]     = useState<UserSettings['view']>(settings?.view || 'grid')
    const [filter, setFilter] = useState<UserSettings['filter']>(settings?.filter || 'all')
    const [sort, setsort]     = useState<UserSettings['sort']>(settings?.sort || 'title')
    
    function handleClick( setting : 'view', value : UserSettings['view']) : void
    function handleClick( setting : 'filter', value : UserSettings['filter']) : void
    function handleClick( setting : 'sort', value : UserSettings['sort']) : void

    function handleClick( setting: 'view' | 'filter' | 'sort', value : UserSettings['view'] | UserSettings['filter'] | UserSettings['sort'] ) {

        if( !isTouched ) {
            touchForm()
        }

        switch (setting) {
            case 'view': 
                setView(value as UserSettings['view'])
                break
            case 'filter':
                setFilter(value as UserSettings['filter'])
                break
            case 'sort':
                setsort(value as UserSettings['sort'])
        }
    }
    
    return {
        view, filter, sort, handleClick
    }
}
