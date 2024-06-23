import { useState } from "react"


export default function useFormTouch() {

    const [isTouched, setHasTouched] = useState<boolean>(false)

    const touchForm = () => {
        if( !isTouched) setHasTouched(true)
    } 
    
    return { isTouched, touchForm }
}
