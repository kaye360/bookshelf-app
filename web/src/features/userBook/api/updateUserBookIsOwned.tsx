import { UserBook } from "../../../types/types"
import useToggleState from "../../../hooks/useToggleState"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { isString } from "../../../utils/validation"
import { useUserBooks } from "./getUserBooks"
import { Req } from "../../../lib/Req/Req"



export function useUpdateUserBookIsOwned({
    book
} : {
    book : UserBook
}) {

    const { auth : { token } } = useStore()

    const userBooks = useUserBooks()

    const [isOwned, _, toggleIsOwned] = useToggleState(book.group === 'owned')

    async function handleClick () {

        toggleIsOwned()

        const response = await updateIsOwned({token, book, isOwned})

        if(!response.error)  {
            userBooks.mutate()
            return
        } 

        toggleIsOwned()
    }


    return {
        handleClick,
        isOwned
    }
}



async function updateIsOwned({
    token,
    book,
    isOwned
} : {
    token : string | null,
    book  : UserBook,
    isOwned : boolean
}) {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url: `${API_URL}/book/${book.id}`,
        payload : {isOwned : !isOwned},
        token
    })

    return response
}