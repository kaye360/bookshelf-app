import { SyntheticEvent, useEffect } from "react"
import { CloseIcon } from "./Icon"
import { createPortal } from "react-dom"


interface ModalProps {
    closeModalFn : Function
    children? : any
}

export default function Modal( {closeModalFn, children} : ModalProps ) {

    useEffect(() => {

        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') closeModalFn()
        }

        window.addEventListener('keydown', handleEsc);

        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [])

    function handleClick(e: SyntheticEvent) {
        if( e.target instanceof HTMLElement && e.target.id === 'modal' ) {
            closeModalFn()
        }
    }
    
    return createPortal(
        <div
            id="modal"
            onClick={handleClick}
            className={`fixed inset-0 grid place-items-center bg-white/90 animate-modal-bg`}
        >
            <div className={`bg-bg-accent shadow-md p-12 max-w-xl relative animate-modal-content`}>

                {children}

                <button 
                    onClick={ () => closeModalFn() } 
                    className="absolute right-3 top-3"
                >
                    <CloseIcon />
                </button>

            </div>
        </div>
    , document.body)
}
