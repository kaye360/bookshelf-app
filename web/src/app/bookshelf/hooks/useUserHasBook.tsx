import { useStore } from "../../../store/store"


export default function useUserHasBook() {

    const { books } = useStore()

    function userHasBook(key : string|undefined) : boolean {

        if( !key ) return false

        if( books.some( b => b.key === key ) ) {
            return true
        }
        return false
    }

    return userHasBook
}
