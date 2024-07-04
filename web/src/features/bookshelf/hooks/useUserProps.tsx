import { useState } from "react"
import { API_URL } from "../../../config"
import { UserBook } from "../../book/types/types"
import useToggleState from "../../../hooks/useToggleState"
import { Req } from "../../../utils/req"
import { useStore } from "../../../store/store"

export default function useUserProps(book : UserBook) {

    const { auth :  { token } }  = useStore()

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

        const response = await Req.send({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            payload : {isFavourite : !userProps.isFavourite},
            token
        })

        if(response.error) toggleBookIsFavourite()

        throw new Error('update user book function not implemented')
    }

    async function handleIsReadClick() {

        toggleBookIsRead()

        const response = await Req.send({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            payload : {isRead : !userProps.isRead},
            token
        })

        if(response.error) toggleBookIsRead()

        throw new Error('update user book function not implemented')
    }

    async function handleIsOwnedClick() {

        toggleBookIsOwned()

        const response = await Req.send({
            url: `${API_URL}/book/${book.id}`,
            method: 'PUT',
            payload : {group : userProps.group === 'owned' ? 'wishlist' : 'owned'},
            token
        })

        if(response.error) toggleBookIsOwned()

        throw new Error('update user book function not implemented')
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
