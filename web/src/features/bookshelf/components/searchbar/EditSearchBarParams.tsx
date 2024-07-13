import { Dispatch, SetStateAction, useEffect } from "react"
import { createPortal } from "react-dom"
import { CloseIcon } from "../../../../components/common/Icon"
import SortOptions from "./SortOptions"
import ViewOptions from "./ViewOptions"
import FilterOptions from "./FilterOptions"
import TagOptions from "./TagOptions"
import { useNavigate } from "react-router-dom"
import Button from "../../../../components/form/Button"
import Divider from "../../../../components/common/Divider"


export default function EditSearchBarParams({
    showFilters,
    setShowFilters
}: {
    showFilters: boolean
    setShowFilters: Dispatch<SetStateAction<boolean>>
}) {

    const navigate   = useNavigate()
    const shiftRight = useShiftRight(showFilters)

    useEffect( () => {

        function handleOutsideClick(e: MouseEvent) {
            if( !showFilters ) return
            if( e.target instanceof HTMLElement && e.target.id === 'edit-settings-bg' ) {
                setShowFilters(false)
            }
        }

        document.addEventListener('click', handleOutsideClick)

        return () => document.removeEventListener('click', handleOutsideClick)

    }, [showFilters])

    return createPortal(
        <div 
            id="edit-settings-bg"
            className={`
                fixed inset-0 overflow-hidden transition-all 
                ${ showFilters ? 'bg-white/70' : 'pointer-events-none'}
            `}
        >

            <div className={`
                absolute top-0 bottom-0 w-full max-w-xs p-6 bg-bg bg-opacity-[0.97] transition-all duration-200 pointer-events-auto
                grid gap-6 content-start
                ${showFilters ? 'opacity-1' : 'opacity-0'}
            `}
                id="edit-settings-modal"
                style={{ right : shiftRight() }}>

                <header className="flex justify-between items-center ">

                    <h2 className="text-xl font-semibold">
                        Settings
                    </h2>

                    <button
                        onClick={() => setShowFilters(false)}
                        className="active:text-accent"
                    >
                        <CloseIcon size={28} />
                    </button>

                </header>

                <div>
                    <h3 className="font-semibold mb-4">View</h3>
                    <ViewOptions />
                </div>

                <Divider />

                <div>
                    <h3 className="font-semibold mb-4">Sort</h3>
                    <SortOptions />
                </div>

                <Divider />

                <div>
                    <h3 className="font-semibold mb-4">
                        Filter
                    </h3>
                    <FilterOptions />
                </div>

                <Divider />

                <div>
                    <h3 className="font-semibold mb-4">Tags</h3>
                    <TagOptions />
                </div>

                <Button 
                    variant="outline" 
                    onClick={ () => navigate('/settings')}
                    className="text-sm"
                >
                    Change default settings
                </Button>

            </div>
        </div>
        , document.body
    )
}


function useShiftRight ( showFilters: boolean ) {

    const innerContent = document.querySelector('#main-inner-content') as HTMLDivElement
    const modal        = document.querySelector('#edit-settings-modal') as HTMLDivElement

    const modalWidth    = modal ? modal.getBoundingClientRect().width : 0
    const modalRightPos = innerContent ? (innerContent.getBoundingClientRect().left) : 0

    return () => showFilters ? modalRightPos + 'px' : modalRightPos - modalWidth + 'px'
}