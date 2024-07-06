import { UserBook } from "../../../types/types"
import useToggleState from "../../../hooks/useToggleState"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { isString } from "../../../utils/validation"
import { useUserBooks } from "./getUserBooks"
import { Req } from "../../../lib/Req/Req"



export function useUpdateUserBookIsFavourite({
    book
} : {
    book : UserBook
}) {

    const { auth : { token } } = useStore()

    const userBooks = useUserBooks()

    const [isFavourite, _, toggleIsFavourite] = useToggleState(book.isFavourite)

    async function handleClick () {

        toggleIsFavourite()

        const response = await updateIsFavourite({token, book, isFavourite})

        if(!response.error)  {
            userBooks.mutate()
            return
        } 

        toggleIsFavourite()
    }


    return {
        handleClick,
        isFavourite
    }
}



async function updateIsFavourite({
    token,
    book,
    isFavourite
} : {
    token : string | null,
    book  : UserBook,
    isFavourite : boolean
}) {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : {isFavourite : !isFavourite},
        token
    })

    return response
}