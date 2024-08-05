import Button from "../../../components/form/Button";
import BaseLayout from "../../../layouts/BaseLayout";
import CurrentlyReadingSettings from "../components/CurrentlyReadingSettings";
import BookShelfSettings from "../components/BookShelfSettings";
import PersonalSettings from "../components/PersonalSettings";
import ThemeSettings from "../components/ThemeSettings";
import { CheckIcon, LoaderIcon, SaveIcon } from "../../../components/common/Icon";
import useSettingsFormState from "../hooks/useSettingsFormState";


export default function Settings() {

    const { touchForm, isTouched, handleSubmit, isSaved, query } = useSettingsFormState()

    return (
        <BaseLayout title="Settings">

            <form 
                className="grid md:grid-cols-[1fr_350px] gap-6 relative"
                onChange={touchForm}
                onSubmit={handleSubmit}
                id="settingsForm"
            >

                <h1 className="text-xl font-semibold col-span-2">
                    Settings
                </h1>

                <div className="grid gap-12">

                    <CurrentlyReadingSettings 
                        touchForm={touchForm}
                        isSaved={isSaved}
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

                <div className="fixed bottom-24 z-[9999] left-4 right-4 md:relative md:bottom-auto">
                    <div className="md:sticky md:top-0">

                        <img src="/illustrations/book_coffee_plant_2.webp" className="hidden md:block" />

                        <Button 
                            variant="fill" 
                            className="w-full border-y-8 border-bg shadow-none" 
                            disabled={isTouched === false}
                        >
                            { isSaved && !query.isPending ? (
                                <>
                                    <CheckIcon />
                                    Saved
                                </>
                            ) : query.isPending ? (
                                <>
                                    <LoaderIcon />
                                    Saving
                                </>
                            ) : (
                                <>
                                    <SaveIcon />
                                    Save Changes
                                </>
                            )}
                        </Button>

                    </div>
                </div>
                
            </form>

        </BaseLayout>
    )
} 