import { CreateBook } from "../../../types/types"

export function getAuthors(createBookAuthors : CreateBook['authors']) {

    if( !createBookAuthors ) {
        return null
    }

    const authorsArr = createBookAuthors.split(',')
    let authors      = authorsArr.slice(0,5).join(', ') 

    if( authorsArr.length > 5 ){
        authors += '...'
    }

    return authors

} 