import { useState } from "react"
import { API_URL } from "../../../config"
import useFetch from "../../../hooks/useFetch"
import { UserBook } from "../../book/types/types"
import useToggleState from "../../../hooks/useToggleState"
import { useAuth } from "../../auth/hooks/useAuth"

export default function useUserProps(book : UserBook) {

    const { updateUser }  = useAuth()
    const { fetchApi }    = useFetch()

    const [userProps, setUserProps] = useState({
        isRead : book.isRead,
        isFavourite : book.isFavourite,
        group : book.group
    })

    const toggleBookIsFavourite = () => setUserProps( prev => ({ ...prev, isFavourite : !prev.isFavourite}) )
    const toggleBookIsRead      = () => setUserProps( prev => ({ ...prev, isRead : !prev.isRead}) )
    const toggleBookIsOwned     = () => setUserProps( prev => ({ ...prev, group : prev.group === 'owned' ? 'wishlist' : 'owned'}) )

    const [isMoreActionsOpen, setIsMoreActionsOpen, toggleIsMoreActionsOpen] = useToggleState(false)

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


    return {
        handlers : {
            handleIsFavouriteClick,
            handleIsReadClick,
            handleIsOwnedClick,

        },
        moreActions : {
            isMoreActionsOpen,
            setIsMoreActionsOpen,
            toggleIsMoreActionsOpen,
        },
        userProps
    }
}
