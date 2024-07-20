import { Book } from "../../../types/types"
import { useUpdateBookIsFavourite } from "../api/updateBookIsFavourite"
import useToggleState from "../../../hooks/useToggleState"
import { useCreateCommunityPost } from "../../community/api/createCommunityPost"


export default function useHandleUpdateBookIsFavourite({
    book
} : {
    book : Book
}) {
    
    const query     = useUpdateBookIsFavourite()
    const community = useCreateCommunityPost()

    const [isFavourite, _, toggleIsFavourite] = useToggleState(book.isFavourite)

    async function handleUpdateBookIsFavourite () {

        toggleIsFavourite()

        query.mutate({book, isFavourite})

        if( !isFavourite ) {
            community.mutate({book, type : 'FAVOURITE_BOOK' })
        }

        if( query.isError )  {
            toggleIsFavourite()
        }
    }

    return {
        handleUpdateBookIsFavourite,
        isFavourite
    }

}