import useToggleState from "../../../hooks/useToggleState";
import { Book } from "../../../types/types";
import { useUpdateBookIsOwned } from "../api/updateBookIsOwned";


export default function useHandleUpdateBookIsOwned( {
    book
} : {
    book : Book
}) {

    const query = useUpdateBookIsOwned()

    const [isOwned, _, toggleIsOwned] = useToggleState(book.group === 'owned')

    async function handleUpdateBookIsOwned () {
        toggleIsOwned()
        query.mutate({book, isOwned})
        if( query.isError) toggleIsOwned()
    }

    return {
        handleUpdateBookIsOwned,
        isOwned
    }
}