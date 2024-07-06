import useLogout from "../../features/auth/api/useLogout";
import Modal from "../common/Modal";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";

export default function AccountModal({ 
    closeModalFn 
} : {
    closeModalFn : Function
}) {

    const logout   = useLogout()
    const navigate = useNavigate()

    async function handleLogout () {
        await logout()
        navigate('/')
    }

    return (
        <Modal closeModalFn={closeModalFn}>
            <div className="flex items-start justify-center gap-2 mb-4 text-xl font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle translate-y-[2px]"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Are you sure you want to log out?
            </div>

            <div className="flex items-center justify-center gap-4 font-semibold">
                <Button onClick={ handleLogout }>
                    Log out
                </Button>

                <button onClick={ () => closeModalFn() }>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}
