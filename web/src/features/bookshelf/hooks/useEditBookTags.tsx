import { useState, SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import useFetch from "../../../hooks/useFetch"
import { useAuth } from "../../auth/components/AuthProvider"
import { UserBook } from "../../book/types/types"

export default function useEditBookTags({book} : {book : UserBook}) {

    
    const { updateUser } = useAuth()
    const { fetchApi } = useFetch()

    const defaultStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(defaultStatus)


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setStatus( prev => ({...prev, isLoading : true}) )
        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags = tagsInput.value.trim().toLowerCase().split(' ').filter( tag => tag !== "")
        const query = await updateTags(tags)

        setStatus( prev => ({...prev, isLoading : false}))

        if( !query.error ) {
            updateUser()
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => setStatus(defaultStatus), 5000 )
        }
    }

    async function updateTags(tags: string[]) {
        const response = await fetchApi({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            auth : true,
            payload : { tags: JSON.stringify( tags ) }
        })
        return response
    }
    

    return {
        handleSubmit,
        status
    }
}
