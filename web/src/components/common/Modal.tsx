import { SyntheticEvent, useEffect, useRef } from "react"
import { CloseIcon } from "./Icon"
import { createPortal } from "react-dom"

interface ModalProps {
    closeModalFn : Function
    children? : any
}

export default function Modal( {closeModalFn, children} : ModalProps ) {

    const modalOverlayRef = useRef<HTMLDivElement>(null)
    const modalContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [])

    function handleClick(e: SyntheticEvent) {
        if( e.target instanceof HTMLElement && e.target.id === 'modal' ) {
            closeModal()
        }
    }

    function closeModal() {
        modalOverlayRef.current?.classList.remove('animate-modal-overlay-open')
        modalContentRef.current?.classList.remove('animate-modal-content-open')
        modalOverlayRef.current?.classList.add('animate-modal-overlay-close')
        modalContentRef.current?.classList.add('animate-modal-content-close')
        setTimeout( () => closeModalFn(), 200)
    }
    
    return createPortal(
        <div
            id="modal"
            data-testid="modal"
            ref={modalOverlayRef}
            onClick={handleClick}
            className={`fixed inset-0 grid place-items-center bg-bg/85 animate-modal-overlay-open`}
        >
            <div 
                ref={modalContentRef}
                className={`bg-bg-accent shadow-md p-8 w-full max-w-xl relative animate-modal-content-open`}
            >

                {children}

                <button 
                    onClick={ () => closeModal() } 
                    className="absolute right-3 top-3"
                >
                    <CloseIcon />
                </button>

            </div>
        </div>
    , document.body)
}
