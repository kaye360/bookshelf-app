import { Link } from "react-router-dom"
import { useAuth, useAuthDispatch } from "../../lib/auth/AuthProvider"
import { useState } from "react"
import AccountModal from "./AccountModal"
import { AtIcon, LogoutIcon, SettingsIcon } from "../base/Icon"


export default function Account() {

    const { isAuth, user } = useAuth()
    const dispatch         = useAuthDispatch()
    
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)

    return (
        <div className="flex items-center gap-2 text-secondary-700">
            { isAuth
                ? <div className="flex items-center gap-4">

                    <Link
                        to={`/user/${user.handle}`}
                        className="flex gap-[2px] items-center font-medium"
                    >
                        <AtIcon />
                        {user.handle}
                    </Link>

                    <Link to="/settings">
                        <SettingsIcon />
                    </Link>

                    <button onClick={ () => setShowLogoutModal(true) }>
                        <LogoutIcon />
                    </button>

                </div>

                : <div className="flex gap-4">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }

            <AccountModal 
                showLogoutModal={showLogoutModal}
                setShowLogoutModal={setShowLogoutModal}
                dispatch={dispatch}
            />
        </div>
    )
}
