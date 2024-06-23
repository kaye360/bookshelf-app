import Button from "../../components/form/Button";
import BaseLayout from "../../layouts/BaseLayout";
import CurrentlyReadingSettings from "../../features/settings/components/CurrentlyReadingSettings";
import BookShelfSettings from "../../features/settings/components/BookShelfSettings";
import PersonalSettings from "../../features/settings/components/PersonalSettings";
import ThemeSettings from "../../features/settings/components/ThemeSettings";
import useFormTouch from "../../hooks/useFormTouch";
import useFormSubmit from "../../features/settings/hooks/useFormSubmit";

export default function Settings() {

    const { isTouched, touchForm } = useFormTouch()
    const handleSubmit             = useFormSubmit()

    const currentlyReadingProps = { touchForm }
    const bookshelfProps        = { isTouched, touchForm }
    
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

                    <ThemeSettings />

                </div>  

                <div className="relative">
                    <div className="sticky top-0">
                        <img src="/illustrations/book_coffee_plant_2.webp" className="" />
                        <Button variant="fill" className="w-full" disabled={!isTouched}>
                            Save Changes
                        </Button>
                    </div>
                </div>
                
            </form>

        </BaseLayout>
    )
} 