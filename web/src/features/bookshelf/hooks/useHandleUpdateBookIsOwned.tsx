import useToggleState from "../../../hooks/useToggleState";
import { useStore } from "../../../store/store";
import { UserBook } from "../../../types/types";
import { useUpdateUserBookIsOwned } from "../api/updateUserBookIsOwned";


export default function useHandleUpdateBookIsOwned( {
    book
} : {
    book : UserBook
}) {

    const { auth : { token } } = useStore()

    const query = useUpdateUserBookIsOwned()

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