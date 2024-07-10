import Button from "../components/form/Button";
import BaseLayout from "../layouts/BaseLayout";
import CurrentlyReadingSettings from "../features/settings/components/CurrentlyReadingSettings";
import BookShelfSettings from "../features/settings/components/BookShelfSettings";
import PersonalSettings from "../features/settings/components/PersonalSettings";
import ThemeSettings from "../features/settings/components/ThemeSettings";
import { CheckIcon, LoaderIcon } from "../components/common/Icon";
import useSettingsFormState from "../features/settings/hooks/useSettingsFormState";


export default function Settings() {

    const { touchForm, isTouched, handleSubmit, isSaved, query } = useSettingsFormState()

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

                    <CurrentlyReadingSettings 
                        touchForm={touchForm}
                    /> 

                    <BookShelfSettings  
                        isTouched={isTouched}
                        touchForm={touchForm}
                    />
                    
                    <PersonalSettings 
                        touchForm={touchForm}
                    />

                    <ThemeSettings 
                        touchForm={touchForm} 
                    />

                </div>  

                <div className="relative">
                    <div className="sticky top-0">

                        <img src="/illustrations/book_coffee_plant_2.webp" className="" />

                        <Button variant="fill" className="w-full" disabled={!isTouched}>
                            Save Changes
                        </Button>

                        <span className="flex items-center justify-center gap-2 mt-3 text-xl font-semibold">
                            { query.isPending && (
                                <>
                                    <LoaderIcon />
                                    Saving
                                </>
                            )}
                            { isSaved && !query.isPending && (
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