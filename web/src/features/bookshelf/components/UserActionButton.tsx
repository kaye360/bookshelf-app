import { ComponentPropsWithoutRef } from "react";

interface UserActionButtonProps extends ComponentPropsWithoutRef<'button'> {
    children? : any
}

export default function UserActionButton({children, ...props} : UserActionButtonProps) {
    return (
        <button className="hover:bg-primary-light rounded-md p-1 cursor-pointer [&>*]:cursor-pointer" {...props}>
            <label>
                {children}
            </label>
        </button>
    )
}
