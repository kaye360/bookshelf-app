import { useStore } from "../../../store/store"
import { UserSettings } from "../../../types/types"
import useBookshelfParams from "./useBookshelfParams"
import { VALID_SORTS } from "../../../config"

export default function useBookshelfSort() {

    let sort : UserSettings['sort']

    const { searchParams } = useBookshelfParams()
    const { settings }     = useStore()
    const sortBy           = searchParams.get('sortBy')

    if( isValidSort(sortBy) ) {
        // If Search Param, use search param
        sort = sortBy

    } else if( isValidSort(settings.sort)) {
        // Else use user setting
        sort = settings.sort

    } else {
        // Default to Title
        sort = 'title'
    }

    return sort
}

function isValidSort(sortBy: any) : sortBy is UserSettings['sort'] {
    return VALID_SORTS.includes( sortBy ) && sortBy !== null
}