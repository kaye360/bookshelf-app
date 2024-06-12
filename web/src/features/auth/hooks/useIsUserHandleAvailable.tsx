import debounce from "lodash.debounce"
import { useRef, useState } from "react"
import { API_URL } from "../../../config"

export default function useIsUserHandleAvailable() {

    const handleUsernameOnChange = useRef (
        debounce( async (e) => {
            if( !hasTouched ) {
                setHasTouched(true)
            }
            const res = await fetch(`${API_URL}/register/isUserHandleAvailable/${e.target.value}`)
            const json = await res.json()
            if( Object.hasOwn( json, 'isHandleAvailable' )) {
                setIsUserHandleAvailable( json.isHandleAvailable )
            }
        }, 1000) 
    ).current

    const [isUserHandleAvailable, setIsUserHandleAvailable] = useState<boolean>(true)
    const [hasTouched, setHasTouched] = useState(false)
    
    return {
        handleUsernameOnChange,
        isUserHandleAvailable,
        hasTouched
    }
}
