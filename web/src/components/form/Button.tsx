import { ComponentPropsWithoutRef, MouseEventHandler } from "react"

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
    variant? : 'fill' | 'outline' | 'ghost'
    children? : any
    onClick? : MouseEventHandler<HTMLButtonElement>
}

export default function Button({variant = 'fill', onClick, children, ...props} : ButtonProps ) {
    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center justify-center gap-2 text-lg font-semibold tracking-wider px-6 py-2 mt-2 rounded-lg active:scale-95 select-none
                ${ variant === 'fill' 
                    ? 'bg-gradient-to-tr from-accent to-accent/80 text-bg shadow-md hover:from-primary-light hover:to-primary-light/60 ' : ''}
                ${ variant === 'ghost' ? 'text-accent hover:text-primary-light' : ''}
                ${ variant === 'outline' ? 'border border-accent/20 text-accent hover:text-primary hover:border-accent' : ''}
            `}
            {...props}
        >
            {children}
        </button>
    )
}
