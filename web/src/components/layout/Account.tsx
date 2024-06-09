import { Link } from "react-router-dom"
import { useAuth, useAuthDispatch } from "../../features/auth/components/AuthProvider"
import { useState } from "react"
import AccountModal from "./AccountModal"
import { AtIcon, LogoutIcon, SettingsIcon, UserIcon } from "../common/Icon"
import useToggleState from "../../hooks/useToggleState"


export default function Account() {

    const { isAuth, user } = useAuth()
    const dispatch         = useAuthDispatch()
    
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
    const [showDropDown, _, toggleDropDown] = useToggleState(false)
    return (
        <div className="flex items-center gap-2 text-secondary-700">
            { isAuth
                ? <div className="relative">

                    <button
                        onClick={ () => toggleDropDown() }
                        className="flex gap-[2px] items-center hover:bg-accent hover:text-bg p-3 rounded-md font-semibold tracking-wider"
                    >
                        <span className=" rounded-full bg-primary-dark/10 p-2 mr-1">
                            <UserIcon size={18} />
                        </span>
                        <AtIcon size={18} />
                        {user.handle}
                    </button>

                    <div className={`
                        absolute top-full right-0 bg-bg-accent z-[9999999] grid gap-3 transition-all overflow-hidden
                        ${showDropDown ? 'py-2 max-h-[200px]' : 'py-0 max-h-0'}
                    `}>

                        <Link to="/user" className="flex items-center gap-2 px-6 py-2 hover:bg-primary-light/30 border-0">
                            <UserIcon />
                            Profile
                        </Link>

                        <Link to="/settings" className="flex items-center gap-2 px-6 py-2 hover:bg-primary-light/30 border-0">
                            <SettingsIcon />
                            Settings
                        </Link>

                        <button className="flex items-center gap-2 px-6 py-2 hover:bg-primary-light/30 border-0" onClick={ () => setShowLogoutModal(true) }>
                            <LogoutIcon />
                            Logout
                        </button>
                        
                    </div>

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
