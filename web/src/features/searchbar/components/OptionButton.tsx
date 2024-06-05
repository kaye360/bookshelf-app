import { MouseEventHandler } from "react"

interface OptionButtonProps {
    isActive? : boolean
    onClick : MouseEventHandler<HTMLButtonElement>
    children?: any
}

export default function OptionButton({isActive = false, onClick, children} : OptionButtonProps ) {
    return (
        <button 
            className={`text-sm cursor-pointer transition-all
                ${isActive ? 'text-accent font-bold' : 'bg-bg  font-semibold '}
            `}
            onClick={onClick}
        >
            <span className="flex items-center gap-[2px] md:gap-1 translate-y-[1px] min-w-max">
                {children}
            </span>
        </button>
    )
}