import { Link } from "react-router-dom"
import { useState } from "react"
import AccountModal from "./AccountModal"
import { ChevronDownIcon, LogoutIcon, SettingsIcon, UserIcon } from "../../components/common/Icon"
import useToggleState from "../../hooks/useToggleState"
import { useStore } from "../../store/store"
import Avatar from "../../components/common/Avatar"


export default function Account() {

    const { auth : { isAuth, user } } = useStore()
    
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
    const [showDropDown, _, toggleDropDown] = useToggleState(false)
    return (
        <div className="flex items-center gap-2 text-secondary-700">
            { isAuth
                ? <div className="relative">

                    <button
                        onClick={ () => toggleDropDown() }
                        className="flex gap-[2px] items-center hover:bg-accent hover:text-bg px-6 py-3 rounded-md font-semibold tracking-wider"
                    >
                        <Avatar handle={user.handle} />
                        {user.handle}
                        <ChevronDownIcon size={18} />
                    </button>

                    <div className={`
                        absolute top-full right-0 w-fit bg-bg z-[9999999] grid gap-3 transition-all overflow-hidden shadow-lg origin-top-right rounded-lg
                        ${showDropDown ? 'py-2 max-h-[200px] scale-1' : 'py-0 max-h-0 scale-0'}
                    `}>

                        <Link to="/user" className="flex items-center gap-2 px-12 py-2 hover:bg-primary-dark hover:text-bg border-0 font-semibold">
                            <UserIcon />
                            Profile
                        </Link>

                        <Link to="/settings" className="flex items-center gap-2 px-12 py-2 hover:bg-primary-dark hover:text-bg border-0 font-semibold">
                            <SettingsIcon />
                            Settings
                        </Link>

                        <button className="flex items-center gap-2 px-12 py-2 hover:bg-primary-dark hover:text-bg border-0 font-semibold" onClick={ () => setShowLogoutModal(true) }>
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
            
            { showLogoutModal &&
                <AccountModal closeModalFn={ () => setShowLogoutModal(false) } />
            }
        </div>
    )
}
