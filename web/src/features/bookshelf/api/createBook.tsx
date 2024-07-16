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

    console.log(props.book)

    /**
     * 
     * This pre-request validation is needed to transfrom the data from 
     * the external book api format to the local Book DB API
     * compatible format.
     * 
     */
    const transform = CreateBookSchema.validateSync({
        title       : props.book.title,
        authors     : props.book.authors || 'N/A',
        userId      : user.id,
        rating      : 0,
        isRead      : props.isRead.checked,
        group       : props.isOwned.checked ? 'owned' : 'wishlist',
        isFavourite : false,
        tags        : props.book.tags,
        imageUrl    : props.book.imageUrl,
        isbn10      : props.book.isbn10,
        isbn13      : props.book.isbn13,
    })

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : transform,
        token
    })

    response.data.tags = JSON.parse( response.data.tags )
    console.log(response)

    const validated = BookSchema.validateSync(response.data)

    return validated
}