import debounce from "lodash.debounce"
import { useRef, useState } from "react"
import { API_URL } from "../../../config"
import useFormTouch from "../../../hooks/useFormTouch"
import { Req } from "../../../lib/Req/Req"

export default function useIsUserHandleAvailable() {

    const handleUsernameOnChange = useRef (
        debounce( async (e) => {
            if( !isTouched ) {
                touchForm()
            }

            const response = await Req.get( `${API_URL}/register/isUserHandleAvailable/${e.target.value}` )

            if( Object.hasOwn( response.data, 'isHandleAvailable' )) {
                setIsUserHandleAvailable( response.data.isHandleAvailable )
            }
        }, 1000) 
    ).current

    const [isUserHandleAvailable, setIsUserHandleAvailable] = useState<boolean>(true)

    const { isTouched, touchForm } = useFormTouch()
    
    return {
        handleUsernameOnChange,
        isUserHandleAvailable,
        isTouched
    }
}
