import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import LogoutModal from "./LogoutModal"
import { ChevronDownIcon, LogoutIcon, SettingsIcon, UserIcon } from "../../components/common/Icon"
import useToggleState from "../../hooks/useToggleState"
import { useStore } from "../../store/store"
import Avatar from "../../components/common/Avatar"
import AccountDropDown from "./AccountDropDown"
import AccountDropDownLink from "./AccountDropDownLink"


export default function Account() {

    const { auth : { isAuth, user } } = useStore()
    
    const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)
    const [showDropDown, setShowDropDown, toggleDropDown] = useToggleState(false)

    useEffect( () => {

        function handleOutsideClick(e : MouseEvent) {
            if( !(e.target instanceof HTMLElement)) return
            
            const els = document.elementsFromPoint(e.pageX, e.pageY)
            if( !els.some( el => el.id === 'acount-drop-down' || el.id === 'account-drop-down-button' ) ) {
                setShowDropDown(false)
            } 
        }
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, [])

    return (
        <div className="flex items-center gap-2 text-secondary-700">
            { isAuth
                ? <div className="relative">

                    <button
                        id="account-drop-down-button"
                        onClick={ toggleDropDown }
                        className="flex gap-[2px] items-center hover:bg-accent hover:text-bg px-6 py-3 rounded-md text-sm font-semibold tracking-wider"
                    >
                        <Avatar handle={user.handle} />
                        {user.handle}
                        <ChevronDownIcon size={18} />
                    </button>

                    <AccountDropDown showDropDown={showDropDown}>

                        <AccountDropDownLink to="/user">
                            <UserIcon />
                            Profile
                        </AccountDropDownLink>

                        <AccountDropDownLink to="/settings">
                            <SettingsIcon />
                            Settings
                        </AccountDropDownLink>

                        <AccountDropDownLink onClick={ () => setShowLogoutModal(true) }>
                            <LogoutIcon />
                            Logout
                        </AccountDropDownLink>
                        
                    </AccountDropDown>

                </div>

                : <div className="flex gap-4">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
            
            { showLogoutModal &&
                <LogoutModal closeModalFn={ () => setShowLogoutModal(false) } />
            }
        </div>
    )
}
