import { useState } from "react"
import { API_URL } from "../../../config"
import useFetch from "../../../hooks/useFetch"
import { UserBook } from "../../book/types/types"
import { useAuth } from "../../auth/components/AuthProvider"

export default function useUserProps(book : UserBook) {

    const { updateUser }  = useAuth()
    const { fetchApi } = useFetch()

    const [userProps, setUserProps] = useState({
        isRead : book.isRead,
        isFavourite : book.isFavourite,
        group : book.group
    })

    const toggleBookIsFavourite = () => setUserProps( prev => ({ ...prev, isFavourite : !prev.isFavourite}) )
    const toggleBookIsRead      = () => setUserProps( prev => ({ ...prev, isRead : !prev.isRead}) )
    const toggleBookIsOwned     = () => setUserProps( prev => ({ ...prev, group : prev.group === 'owned' ? 'wishlist' : 'owned'}) )


    /**
     * @todo refactor the following into 1 function
     */

    async function handleIsFavouriteClick() {

        toggleBookIsFavourite()

        const response = await fetchApi({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            auth : true,
            payload : {isFavourite : !userProps.isFavourite}
        })

        if(response.error) toggleBookIsFavourite()

        updateUser()
    }

    async function handleIsReadClick() {

        toggleBookIsRead()

        const response = await fetchApi({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            auth : true,
            payload : {isRead : !userProps.isRead}
        })

        if(response.error) toggleBookIsRead()

        updateUser()
    }

    async function handleIsOwnedClick() {

        toggleBookIsOwned()

        const response = await fetchApi({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            auth : true,
            payload : {group : userProps.group === 'owned' ? 'wishlist' : 'owned'}
        })

        if(response.error) toggleBookIsOwned()

        updateUser()
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
        handleIsFavouriteClick,
        handleIsReadClick,
        handleIsOwnedClick,
        updateTags,
        userProps
    }
}
