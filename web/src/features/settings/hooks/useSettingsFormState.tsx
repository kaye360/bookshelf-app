import { SyntheticEvent, useState } from "react"
import useFormTouch from "../../../hooks/useFormTouch"
import useUpdateSettings from "../api/updateSettings"

export default function useSettingsFormState() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSaved, setIsSaved]     = useState<boolean>(false)

    const { isTouched, touchForm, resetTouch } = useFormTouch()

    const updateSettings = useUpdateSettings()

    async function handleSubmit(e: SyntheticEvent) {
        setIsLoading(true)

        const response = await updateSettings(e)

        if( !response.error ) {
            setIsLoading(false)
            setIsSaved(true)

            setTimeout( () => {
                setIsSaved(false)
                resetTouch()
            }, 4000)
        } else {
            setIsLoading(false)
            resetTouch()
        }
    }

    return {
        isLoading,
        setIsLoading,

        isSaved,
        setIsSaved,

        isTouched,
        touchForm,
        resetTouch,

        handleSubmit,
    }
}
