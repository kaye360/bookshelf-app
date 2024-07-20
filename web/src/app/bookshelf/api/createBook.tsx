import { API_URL } from "../../../config";
import { Book,  CreateBook,  User } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBookSchema } from "../validation/createBookValidation";
import { BookSchema } from "../validation/bookValidation";


interface CreateBookProps {
    book : CreateBook,
    user : User|null,
    isOwned : HTMLInputElement,
    isRead  : HTMLInputElement,
    token? : string|null
}

 
/**
 * 
 * The api query or mutation to be consumed across the app
 * 
 */
export function useCreateBook() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['createBook'],
        mutationFn  : (props : CreateBookProps) => createBook({...props}),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getBooks']
            })
        },
        onError : (error) => console.log({error})
    })
}


/**
 * 
 * The function containing the request and response.
 * Only to be used in the above hook
 * @returns a validated response or throws an error
 * 
 */
async function createBook(props : CreateBookProps ) : Promise<Book> {

    const { user, token } = props
    if( !user || !token ) {
        throw new Error('Invalid user or token')
    }

    /**
     * 
     * This pre-request validation is needed to transfrom the data from 
     * the external book api format to the local Book DB API
     * compatible format.
     * 
     */

    const { title, authors, rating, tags, imageUrl, pageCount, publishedDate, isFavourite, key } =  props.book

    const transform = CreateBookSchema.validateSync({
        userId        : user.id,
        isRead        : props.isRead.checked,
        group         : props.isOwned.checked ? 'owned'   : 'wishlist',
        key,
        title,
        authors,
        rating,
        isFavourite,
        tags,
        imageUrl,
        pageCount,
        publishedDate
    })

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : transform,
        token
    })

    response.data.tags = JSON.parse( response.data.tags )

    const validated = BookSchema.validateSync(response.data)

    return validated
}