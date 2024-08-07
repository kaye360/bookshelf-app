import { MouseEventHandler } from "react"

interface OptionButtonProps {
    isActive? : boolean
    onClick : MouseEventHandler<HTMLButtonElement>
    children?: any
}

export default function OptionButton({isActive = false, onClick, children} : OptionButtonProps ) {
    return (
        <button 
            type="button"
            className={`text-md cursor-pointer transition-all hover:text-accent select-none
                ${isActive ? 'text-accent font-medium' : ' font-normal '}
            `}
            onClick={onClick}
        >
            <span className="flex items-center gap-2 md:gap-1 translate-y-[1px] min-w-max">
                {children}
            </span>
        </button>
    )
}