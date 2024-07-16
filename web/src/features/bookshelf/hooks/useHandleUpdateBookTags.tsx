import { SyntheticEvent, useState } from "react"
import { useStore } from "../../../store/store"
import { Book } from "../../../types/types"
import { isString } from "../../../utils/validation"
import { extractTagsFromInput } from "../services/tagServices"
import { useUpdateBookTags } from "../api/updateBookTags"


export default function useHandleUpdateBookTags() {
    
    const { auth : {token} } = useStore()
    const [hasClicked, setHasClicked] = useState<boolean>(false)

    const query = useUpdateBookTags()

    async function handleUpdateBookTags(book : Book, e: SyntheticEvent) {
        e.preventDefault()

        if( !isString(token) ) return

        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags      = extractTagsFromInput(tagsInput)

        query.mutate({token, book, tags})
        setHasClicked(true)
    }
    
    return {
        query,
        handleUpdateBookTags,
        hasClicked
    }
}