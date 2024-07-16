import useToggleState from "../../../hooks/useToggleState";
import { useStore } from "../../../store/store";
import { Book } from "../../../types/types";
import { useUpdateBookIsOwned } from "../api/updateBookIsOwned";


export default function useHandleUpdateBookIsOwned( {
    book
} : {
    book : Book
}) {

    const { auth : { token } } = useStore()

    const query = useUpdateBookIsOwned()

    const [isOwned, _, toggleIsOwned] = useToggleState(book.group === 'owned')

    async function handleUpdateBookIsOwned () {

        toggleIsOwned()

        query.mutate({book, token, isOwned})

        if( query.isError) toggleIsOwned()
    }

    return {
        handleUpdateBookIsOwned,
        isOwned
    }
}