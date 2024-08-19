import { Dispatch, SetStateAction, useState } from "react"
import { useStore } from "../../../store/store"
import { UserSettings } from "../../../types/types"
import { DEFAULT_FILTER, DEFAULT_SORT, DEFAULT_VIEW } from "../../../config"
import { objectLength } from "../../../utils/validation"

export default function useBookshelfSettings({
    isTouched, 
    touchForm 
} : {
    isTouched : boolean
    touchForm : () => void
}) {

    const { settings } = useStore()

    const [view, setView]     = useState<UserSettings['view']>(settings?.view || DEFAULT_VIEW)
    const [filter, setFilter] = useState<UserSettings['filter']>(settings?.filter || DEFAULT_FILTER)
    const [sort, setsort]     = useState<UserSettings['sort']>(settings?.sort || DEFAULT_SORT)

    const setState: {
        [key : string | 'view' | 'filter' | 'sort']: Dispatch<SetStateAction<any>>
    } = {
        view   : setView,
        filter : setFilter,
        sort   : setsort
    }
    
    function handleClick( setting : {
        view?   : UserSettings['view']
        filter? : UserSettings['filter']
        sort?   : UserSettings['sort']
    }) {

        if( !setting || objectLength(setting) !== 1) {
            throw new Error('Invalid setting input')
        }

        if( !isTouched ) {
            touchForm()
        }

        const [settingToUpdate, value] = Object.entries(setting)[0]

        setState[settingToUpdate](value)
    }
    
    return {
        view, filter, sort, handleClick
    }
}
