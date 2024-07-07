import { useStore } from "../../../store/store"
import { UserBook } from "../../../types/types"
import { useUpdateUserBookIsFavourite } from "../api/updateUserBookIsFavourite"
import useToggleState from "../../../hooks/useToggleState"


export default function useHandleUpdateBookIsFavourite({
    book
} : {
    book : UserBook
}) {
    
    const { auth : { token } } = useStore()
    
    const query = useUpdateUserBookIsFavourite()

    const [isFavourite, _, toggleIsFavourite] = useToggleState(book.isFavourite)


    async function handleUpdateBookIsFavourite () {

        toggleIsFavourite()

        query.mutate({token, book, isFavourite})

        if( query.isError )  toggleIsFavourite()
    }

    return {
        handleUpdateBookIsFavourite,
        isFavourite
    }

}