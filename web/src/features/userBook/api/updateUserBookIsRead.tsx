import { UserBook } from "../../../types/types"
import useToggleState from "../../../hooks/useToggleState"
import { API_URL } from "../../../config"
import { useStore } from "../../../store/store"
import { isString } from "../../../utils/validation"
import { useUserBooks } from "./getUserBooks"
import { Req } from "../../../lib/Req/Req"



export function useUpdateUserBookIsRead({
    book
} : {
    book : UserBook
}) {

    const { auth : { token } } = useStore()

    const userBooks = useUserBooks()

    const [isRead, _, toggleIsRead] = useToggleState(book.isRead)

    async function handleClick () {

        toggleIsRead()

        const response = await updateIsRead({token, book, isRead})

        if(!response.error)  {
            userBooks.mutate()
            return
        } 

        toggleIsRead()
    }


    return {
        handleClick,
        isRead
    }
}



async function updateIsRead({
    token,
    book,
    isRead
} : {
    token : string | null,
    book  : UserBook,
    isRead : boolean
}) {

    if( !isString(token) ) return {
        error : "Invalid User Token",
        data  : null,
        code  : 404
    }

    const response = await Req.put({
        url     : `${API_URL}/book/${book.id}`,
        payload : {isRead : !isRead},
        token
    })

    return response
}