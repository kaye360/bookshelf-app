import Tooltip from "../../../../components/common/Tooltip"

export default function SettingsMenuButton({setShowFilters} : {
    setShowFilters : React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Tooltip title="Update Settings">
            <button 
                onClick={() => setShowFilters(prev => !prev)}
                className="h-full rounded-lg bg-primary-light/10 border border-primary-light [&>*]:stroke-primary-dark grid place-items-center px-4 text-bg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sliders rotate-90"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>

            </button>
        </Tooltip>
    )
}