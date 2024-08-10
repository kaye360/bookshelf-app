import { ComponentPropsWithoutRef } from "react";


interface UserActionsMoreButtonProps extends ComponentPropsWithoutRef<"button"> {
    children : any
}


export default function UserActionsMenuButton({children, ...props}: UserActionsMoreButtonProps ) {
    return (
        <button className="flex items-center justify-end gap-2 hover:bg-primary-light text-sm font-semibold w-full px-6 py-2 min-w-max relative z-0" {...props}>
            {children}
        </button>
    )
}
