import { useEffect } from "react"


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
    
    return (
        <div
            className={`
                fixed inset-0 grid place-items-center m-2 bg-white/70 transition-all duration-500
                ${showModal ? 'z-[9999] opacity-100' : 'z-[-9999] opacity-0'}
            `}
            onClick={() => setShowModal(false)}
        >
            <div className="bg-bg-accent shadow-md p-12">
                {children}
            </div>
        </div>
    )
}
