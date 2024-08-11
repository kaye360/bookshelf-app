import { Book } from "../../../types/types"

export function userHasBook({
    key,
    books
} : {
    key? : string, 
    books : Book[]}
) : boolean {

    if( !key ) return false

    if( books.some( b => b.key === key )) {
        return true
    }
    return false
}
