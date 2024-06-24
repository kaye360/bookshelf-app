import { useState } from "react"


export default function useFormTouch() {

    const [isTouched, setHasTouched] = useState<boolean>(false)

    const touchForm = () => {
        if( !isTouched) setHasTouched(true)
    } 

    const resetTouch = () => [
        setHasTouched(false)
    ]
    
    return { isTouched, touchForm, resetTouch }
}
