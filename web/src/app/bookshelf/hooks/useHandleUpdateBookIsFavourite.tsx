import { useStore } from "../../../store/store"
import { Book } from "../../../types/types"
import { useUpdateBookIsFavourite } from "../api/updateBookIsFavourite"
import useToggleState from "../../../hooks/useToggleState"
import { useCreateCommunityPost } from "../../community/api/createCommunityPost"


export default function useHandleUpdateBookIsFavourite({
    book
} : {
    book : Book
}) {
    
    const { auth : { token, user } } = useStore()
    
    const query = useUpdateBookIsFavourite()
    const community = useCreateCommunityPost()

    const [isFavourite, _, toggleIsFavourite] = useToggleState(book.isFavourite)


    async function handleUpdateBookIsFavourite () {

        if( !user || !token ) { return }

        toggleIsFavourite()

        query.mutate({token, book, isFavourite})

        if( !isFavourite ) {
            community.mutate({ user, book, type : 'FAVOURITE_BOOK' })
        }

        if( query.isError )  toggleIsFavourite()
    }

    return {
        handleUpdateBookIsFavourite,
        isFavourite
    }

}