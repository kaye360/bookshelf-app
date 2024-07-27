import useLogout from "../../app/auth/api/useLogout";
import Modal from "../../components/common/Modal";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";

export default function LogoutModal({ 
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
            <div className="mb-4 text-center text-xl font-semibold">
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
