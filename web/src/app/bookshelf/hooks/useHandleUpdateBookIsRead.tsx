import useToggleState from "../../../hooks/useToggleState";
import { Book } from "../../../types/types";
import { useStore } from "../../../store/store";
import { useUpdateBookIsRead } from "../api/updateBookIsRead";
import { useCreateCommunityPost } from "../../community/api/createCommunityPost";


export default function useHandleUpdateBookIsRead({
    book
} : {
    book : Book
}) {

    const { auth : { token, user } } = useStore()

    const query = useUpdateBookIsRead()
    const community = useCreateCommunityPost()

    const [isRead, _, toggleIsRead] = useToggleState(book.isRead)

    
    async function handleUpdateBookIsRead () {

        if( !user || !token ) { return }

        toggleIsRead()

        query.mutate({token, book, isRead })

        if( !isRead ) {
            community.mutate({ user, book, type : 'READ_BOOK' })
        }

        if( query.isError ) toggleIsRead()
    }


    return {
        handleUpdateBookIsRead,
        isRead
    }
}