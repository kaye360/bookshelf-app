import useToggleState from "../../../hooks/useToggleState";
import { Book } from "../../../types/types";
import { useStore } from "../../../store/store";
import { useUpdateBookIsRead } from "../api/updateBookIsRead";


export default function useHandleUpdateBookIsRead({
    book
} : {
    book : Book
}) {

    const { auth : { token } } = useStore()

    const query = useUpdateBookIsRead()

    const [isRead, _, toggleIsRead] = useToggleState(book.isRead)

    
    async function handleUpdateBookIsRead () {

        toggleIsRead()

        query.mutate({token, book, isRead })

        if( query.isError ) toggleIsRead()
    }


    return {
        handleUpdateBookIsRead,
        isRead
    }
}