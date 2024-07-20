import useToggleState from "../../../hooks/useToggleState";
import { Book } from "../../../types/types";
import { useUpdateBookIsRead } from "../api/updateBookIsRead";
import { useCreateCommunityPost } from "../../community/api/createCommunityPost";


export default function useHandleUpdateBookIsRead({
    book
} : {
    book : Book
}) {

    const query = useUpdateBookIsRead()
    const community = useCreateCommunityPost()

    const [isRead, _, toggleIsRead] = useToggleState(book.isRead)

    async function handleUpdateBookIsRead () {

        toggleIsRead()

        query.mutate({ book, isRead })

        if( !isRead ) {
            community.mutate({ book, type : 'READ_BOOK' })
        }

        if( query.isError ) {
            toggleIsRead()
        }
    }


    return {
        handleUpdateBookIsRead,
        isRead
    }
}