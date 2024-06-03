import { SyntheticEvent, useEffect } from "react"


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
}


function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
    )
}