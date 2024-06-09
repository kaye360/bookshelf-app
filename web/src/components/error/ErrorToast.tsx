import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { AlertIcon } from "../common/Icon";
import { createPortal } from "react-dom";


interface ErrorToastProps extends ComponentPropsWithoutRef<'div'> {
    isShown : boolean
    message : string
}


export default function ErrorToast({isShown, message} : ErrorToastProps) {

    const [showErrorToast, setShowErrorToast] = useState<boolean>(isShown)

    useEffect( () => {
        if( isShown ) {
            setShowErrorToast(true)
            setTimeout( () => setShowErrorToast(false), 4000 ) 
        } else {
            setShowErrorToast(false)
        }
   }, [isShown])

    if (showErrorToast) { return (
        <>
            { createPortal(
                <div className="fixed z-[999999998999] bottom-20 md:bottom-3 left-1 right-1 flex justify-center animate-error-toast">
        
                    <div className="relative flex items-start gap-3 px-8 py-4 bg-primary-dark text-bg font-semibold rounded">
                        <AlertIcon className='stroke-2 shrink-0' />
                        {message}
                        <div className="absolute bottom-0 left-0 h-1 bg-accent rounded animate-error-toast-timer" />
                    </div>

                    
                </div>
                , document.body
            )}
        </>
    ) } else {
        return <></>
    }
}
