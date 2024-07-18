import { ComponentPropsWithoutRef, ReactNode } from "react"

interface WrapperProps extends ComponentPropsWithoutRef<'div'> {
    children? : ReactNode
    className? : string
}

export default function Wrapper( {className: propClassNames = '', children, ...props} : WrapperProps ) {
    return (
        <div className={`w-full relative max-w-6xl mx-auto py-4 px-3 md:px-8 ${propClassNames}`} {...props}>
            {children}
        </div>
    )
}
