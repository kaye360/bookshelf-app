import { useStore } from "../../../store/store"
import { Book } from "../../../types/types"
import { useUpdateBookIsFavourite } from "../api/updateBookIsFavourite"
import useToggleState from "../../../hooks/useToggleState"


export default function useHandleUpdateBookIsFavourite({
    book
} : {
    book : Book
}) {
    
    const { auth : { token } } = useStore()
    
    const query = useUpdateBookIsFavourite()

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