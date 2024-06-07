import { SyntheticEvent, useEffect } from "react"
import { CloseIcon } from "./Icon"


interface ModalProps {
    showModal : boolean
    setShowModal : Function
    children? : any
}

export default function Modal( {showModal, setShowModal, children} : ModalProps ) {

    useEffect(() => {

        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') setShowModal(false)
        }

        window.addEventListener('keydown', handleEsc);

        return () => { window.removeEventListener('keydown', handleEsc) }
    }, [])

    function handleClick(e: SyntheticEvent) {
        if( e.target instanceof HTMLElement && e.target.id === 'modal' ) {
            setShowModal(false)
        }
    }
    
    if (showModal) { 
        return (

            <div
                id="modal"
                onClick={handleClick}
                className={`
                    fixed inset-0 grid place-items-center bg-white/90 transition-all duration-500
                    ${showModal ? 'z-[9999] opacity-100' : 'z-[-9999] opacity-0'}
                `}
            >
                <div className="bg-bg-accent shadow-md p-12 max-w-xl relative">

                    {children}

                    <button 
                        onClick={ () => setShowModal(false) } 
                        className="absolute right-3 top-3"
                    >
                        <CloseIcon />
                    </button>

                </div>
            </div>
        )
    } else {
        return <></>
    }
}
