import Button from "../components/form/Button";
import BaseLayout from "../layouts/BaseLayout";
import CurrentlyReadingSettings from "../features/settings/components/CurrentlyReadingSettings";
import BookShelfSettings from "../features/settings/components/BookShelfSettings";
import PersonalSettings from "../features/settings/components/PersonalSettings";
import ThemeSettings from "../features/settings/components/ThemeSettings";
import useFormTouch from "../hooks/useFormTouch";
import useFormSubmit from "../features/settings/hooks/useFormSubmit";
import { SyntheticEvent, useState } from "react";
import { CheckIcon, LoaderIcon } from "../components/common/Icon";

export default function Settings() {

    const {
        touchForm,
        handleSubmit,
        currentlyReadingProps,
        bookshelfProps,
        isTouched,
        isSaved,
        isLoading
    } = useSettings()

    return (
        <BaseLayout>

            <form 
                className="grid grid-cols-[1fr_350px] gap-3"
                onChange={touchForm}
                onSubmit={handleSubmit}
                id="settingsForm"
            >

                <div className="grid gap-12">

                    <h1 className="text-xl font-semibold">Settings</h1>

                    <CurrentlyReadingSettings {...currentlyReadingProps} />

                    <BookShelfSettings {...bookshelfProps} />
                    
                    <PersonalSettings />

                    <ThemeSettings touchForm={touchForm} />

                </div>  

                <div className="relative">
                    <div className="sticky top-0">

                        <img src="/illustrations/book_coffee_plant_2.webp" className="" />

                        <Button variant="fill" className="w-full" disabled={!isTouched}>
                            Save Changes
                        </Button>

                        <span className="flex items-center justify-center gap-2 mt-3 text-xl font-semibold">
                            { isLoading && (
                                <>
                                    <LoaderIcon />
                                    Saving
                                </>
                            )}
                            { isSaved && (
                                <>
                                    <CheckIcon />
                                    Saved
                                </>
                            ) }
                        </span>

                    </div>
                </div>
                
            </form>

        </BaseLayout>
    )
} 




function useSettings() {

    const [isLoading, setIsLoading]            = useState<boolean>(false)
    const [isSaved, setIsSaved]                = useState<boolean>(false)
    const { isTouched, touchForm, resetTouch } = useFormTouch()
    const updateSettings                       = useFormSubmit()

    const currentlyReadingProps = { touchForm }
    const bookshelfProps        = { isTouched, touchForm }

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
        }
    }

    return {
        touchForm,
        handleSubmit,
        currentlyReadingProps,
        bookshelfProps,
        isTouched,
        isSaved,
        isLoading
    }
}