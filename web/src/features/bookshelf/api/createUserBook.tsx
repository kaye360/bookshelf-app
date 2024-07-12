import { API_URL } from "../../../config";
import { CreateUserModelBook, User, UserModelBook } from "../../../types/types";
import { Req } from "../../../lib/Req/Req";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserModelBookSchema, UserModelBookSchema } from "../validation/userModelBookValidation";


interface CreateBookProps {
    book : CreateUserModelBook,
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
export function useCreateUserBook() {

    const client = useQueryClient()

    return useMutation({
        mutationKey : ['createBook'],
        mutationFn  : (props : CreateBookProps) => createBook({...props}),
        onSuccess   : () => {
            client.invalidateQueries({
                queryKey : ['getUserBooks']
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
async function createBook(props : CreateBookProps ) : Promise<UserModelBook> {

    const { user, token } = props
    if( !user || !token ) {
        throw new Error('Invalid user or token')
    }

    /**
     * 
     * This pre-request validation is needed to transfrom the data from 
     * the external book api format to the local UserBook DB API
     * compatible format.
     * 
     */
    const transform = CreateUserModelBookSchema.validateSync({
        title       : props.book.title,
        authors     : props.book.authors || 'N/A',
        userId      : user.id,
        rating      : 0,
        isRead      : props.isRead.checked,
        group       : props.isOwned.checked ? 'owned' : 'wishlist',
        isFavourite : false,
        tags        : JSON.stringify([]),
        imageUrl    : props.book.imageUrl,
        isbn10      : props.book.isbn10,
        isbn13      : props.book.isbn13,
    })

    const response = await Req.post({
        url     : `${API_URL}/book`,
        payload : transform,
        token
    })

    const validated = UserModelBookSchema.validateSync(response.data)

    return validated
}