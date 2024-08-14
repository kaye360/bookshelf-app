import { Dispatch, SetStateAction, useEffect } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from "../../../../components/common/Icon"
import { useNavigate } from "react-router-dom"
import Button from "../../../../components/form/Button"
import Divider from "../../../../components/common/Divider"
import Wrapper from "../../../../layouts/components/Wrapper"
import Settings from "./Settings"


export default function SettingsMenu({
    showSettingsMenu,
    setShowSettingsMenu
}: {
    showSettingsMenu: boolean
    setShowSettingsMenu: Dispatch<SetStateAction<boolean>>
}) {

    const navigate   = useNavigate()

    useEffect( () => {

        function handleOutsideClick(e: MouseEvent) {
            if( !showSettingsMenu ) return
            if( e.target instanceof HTMLElement && e.target.id === 'edit-settings-bg' ) {
                setShowSettingsMenu(false)
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)

    }, [showSettingsMenu])

    return createPortal(
        <div 
            id="edit-settings-bg"
            className={`
                fixed inset-0 overflow-hidden transition-all 
                ${ showSettingsMenu ? 'bg-bg-accent/70' : 'pointer-events-none'}
            `}
        >

            <Wrapper className="h-full pointer-events-none">
                <div className={`
                    absolute top-0 bottom-0 w-full max-w-xs p-6 bg-bg transition-all duration-200 pointer-events-auto
                    grid gap-6 content-start
                    ${showSettingsMenu ? 'right-0 opacity-1' : '-right-full opacity-0'}
                `}>

                    <header className="flex justify-between items-center ">

                        <h2 className="text-xl font-semibold">
                            Settings
                        </h2>

                        <button
                            onClick={() => setShowSettingsMenu(false)}
                            className="active:text-accent"
                        >
                            <CloseIcon size={28} />
                        </button>

                    </header>

                    <div>
                        <h3 className="font-semibold mb-4">View</h3>
                        <Settings.View />
                    </div>

                    <Divider />

                    <div>
                        <h3 className="font-semibold mb-4">Sort</h3>
                        <Settings.Sort />
                    </div>

                    <Divider />

                    <div>
                        <h3 className="font-semibold mb-4">
                            Filter
                        </h3>
                        <Settings.Filter />
                    </div>

                    <Divider />

                    <div>
                        <h3 className="font-semibold mb-4">Tags</h3>
                        <Settings.Tag />
                    </div>

                    <Button 
                        variant="outline" 
                        onClick={ () => navigate('/settings')}
                        className="text-sm"
                    >
                        Change default settings
                    </Button>

                </div>
            </Wrapper>
        </div>
        , document.body
    )
}