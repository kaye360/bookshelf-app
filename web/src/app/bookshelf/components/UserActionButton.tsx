import { ComponentPropsWithoutRef } from "react";

interface UserActionButtonProps extends ComponentPropsWithoutRef<'button'> {
    children? : any
    className? : string
}

export default function UserActionButton({className = '', children, ...props} : UserActionButtonProps) {
    return (
        <button 
            className={`hover:bg-primary-light rounded-md p-1 cursor-pointer [&>*]:cursor-pointer ${className}`} 
            {...props}
        >
            <label>
                {children}
            </label>
        </button>
    )
}
