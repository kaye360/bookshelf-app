import useToggleState from "../../../hooks/useToggleState";
import { UserBook } from "../../../types/types";
import { useStore } from "../../../store/store";
import { useUpdateUserBookIsRead } from "../api/updateUserBookIsRead";


export default function useHandleUpdateBookIsRead({
    book
} : {
    book : UserBook
}) {

    const { auth : { token } } = useStore()

    const query = useUpdateUserBookIsRead()

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