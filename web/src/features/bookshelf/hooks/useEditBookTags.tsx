import { useState, SyntheticEvent } from "react"
import { API_URL } from "../../../config"
import { UserBook } from "../../book/types/types"
import { Req } from "../../../utils/req"
import { useStore } from "../../../store/store"

export default function useEditBookTags({book} : {book : UserBook}) {

    const { auth : { token } } = useStore()

    const defaultStatus = { isLoading : false, isSuccess : false }
    const [status, setStatus] = useState(defaultStatus)


    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setStatus( prev => ({...prev, isLoading : true}) )
        const tagsInput = document.querySelector('#book-tags-textarea') as HTMLTextAreaElement
        const tags = new Set( tagsInput.value.trim().toLowerCase().split(' ').filter( tag => tag !== "") )
        const tagsArray = Array.from( tags )
        const query = await updateTags(tagsArray)

        setStatus( prev => ({...prev, isLoading : false}))

        if( !query.error ) {
            throw new Error('Update book function not implemented yet')
            setStatus( prev => ({...prev, isSuccess : true}) )
            setTimeout( () => setStatus(defaultStatus), 5000 )
        }
    }

    async function updateTags(tags: string[]) {
        const response = await Req.send({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            payload : { tags: JSON.stringify( tags ) },
            token
        })
        return response
    }
    

    return {
        handleSubmit,
        status
    }
}
