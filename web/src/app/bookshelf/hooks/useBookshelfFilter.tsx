import { useStore } from "../../../store/store"
import useBookshelfParams from "./useBookshelfParams"
import { UserSettings } from "../../../types/types"
import { isValidFilter } from "../services/isValidSetting"

export default function useBookshelfFilter() {

    let filter : UserSettings['filter']

    const { searchParams } = useBookshelfParams()
    const { settings }     = useStore()
    const filterBy         = searchParams.get('filterBy')

    if( isValidFilter( filterBy ) ) {
        // If Search Param, use search param
        filter = filterBy

    } else if( isValidFilter( settings.filter )) {
        // Else use user setting
        filter = settings.filter

    } else {
        // Default to All
        filter = 'all'
    }

    return filter
}