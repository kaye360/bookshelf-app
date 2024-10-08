import { useSearchParams } from "react-router-dom"
import { BookshelfParams } from "../../../types/types"
import { isString } from "../../../utils/validation"

export default function useBookshelfParams() {

    const [searchParams, setSearchParams] = useSearchParams()

    function updateSearchParam<K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) {
        if( !isString(param)) return
        setSearchParams(prev => {
            prev.set(param, value)
            return prev
        }, {replace : true} )
    } 

    function clearSearchParam<K extends keyof BookshelfParams>(param : K) {
        setSearchParams( prev => {
            prev.delete(param)
            return prev
        })
    }

    return { searchParams, updateSearchParam, clearSearchParam }
}
