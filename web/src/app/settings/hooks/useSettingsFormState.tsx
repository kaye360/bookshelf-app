import { SyntheticEvent, useState } from "react"
import useFormTouch from "../../../hooks/useFormTouch"
import useUpdateSettings from "../api/updateSettings"

export default function useSettingsFormState() {

    const [isSaved, setIsSaved]     = useState<boolean>(false)

    const { isTouched, touchForm, resetTouch } = useFormTouch()

    const query = useUpdateSettings()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        query.mutate()
        setIsSaved(true)
        setTimeout( () => {
            setIsSaved(false) 
            resetTouch()
        }, 3000)
    }

    return {
        query,
        isSaved,
        setIsSaved,
        isTouched,
        touchForm,
        resetTouch,
        handleSubmit,
    }
}
