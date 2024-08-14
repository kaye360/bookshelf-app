import { SyntheticEvent, useState } from "react"
import { Book } from "../../../types/types"
import { extractTagsFromInput } from "../services/tagServices"
import { useUpdateBookTags } from "../api/updateBookTags"


export default function useHandleUpdateBookTags() {
    
    const [hasClicked, setHasClicked] = useState<boolean>(false)

    const query = useUpdateBookTags()

    async function handleUpdateBookTags(book : Book, e: SyntheticEvent) {
        e.preventDefault()

        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags      = extractTagsFromInput(tagsInput.value)

        query.mutate({ book, tags })
        setHasClicked(true)
    }
    
    return {
        query,
        handleUpdateBookTags,
        hasClicked
    }
}