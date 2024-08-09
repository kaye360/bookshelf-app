import { useStore } from "../../../store/store"

export function userHasBook(key : string|undefined) : boolean {
    if( !key ) return false

    const books = useStore.getState().books

    if( books.some( b => b.key === key )) {
        return true
    }
    return false
}