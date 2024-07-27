import debounce from "lodash.debounce"
import { useRef, useState } from "react"
import { API_URL } from "../../../config"
import useFormTouch from "../../../hooks/useFormTouch"
import { Req } from "../../../lib/Req/Req"

export type UserHandleStatus = 'initial' | 'fetching' | 'available' | 'unavailable'

export default function useIsUserHandleAvailable() {

    const [status, setStatus] = useState<UserHandleStatus>('initial')

    const handleUsernameOnChange = useRef (
        debounce( async (e) => {
            if( !isTouched ) {
                touchForm()
            }

            setStatus('fetching')

            const response = await Req.get( `${API_URL}/register/isUserHandleAvailable/${e.target.value}` )

            if( 
                Object.hasOwn( response.data, 'isHandleAvailable' ) &&
                response.data.isHandleAvailable
            ) {
                setStatus('available')
            } else {
                setStatus('unavailable')
            }
        }, 1000) 
    ).current

    const { isTouched, touchForm } = useFormTouch()
    
    return {
        handleUsernameOnChange,
        isTouched,
        status
    }
}
