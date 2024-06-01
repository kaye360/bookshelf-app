import { ComponentPropsWithoutRef, MouseEventHandler } from "react"

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    children? : any
    onClick? : MouseEventHandler<HTMLButtonElement>
}

export default function Button({onClick, children, ...props} : ButtonProps ) {
    return (
        <button 
            onClick={onClick}
            className="flex items-center justify-center gap-2 bg-gradient-to-tr from-accent to-accent/80 text-bg text-lg font-semibold tracking-wider p-4 mt-2 rounded-lg shadow-md hover:from-primary hover:to-primary/60 active:scale-95"
            {...props}
        >
            {children}
        </button>
    )
}
