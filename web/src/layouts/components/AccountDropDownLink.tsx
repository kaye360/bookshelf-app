import { Link } from "react-router-dom"

interface LinkProps {
    to : string
    children : any
    onClick? : never
}

interface ButtonProps {
    to? : never
    children : any
    onClick : () => void
}

export default function AccountDropDownLink({
    to,
    children,
    onClick
} : LinkProps | ButtonProps ) {

    if( to ) {
        return (
            <Link 
                to={to} 
                className="flex items-center gap-2 px-12 py-2 hover:bg-primary-dark hover:text-bg border-0 font-semibold"
            >
                {children}
            </Link>
        )
    } 

    return (
        <button 
            className="flex items-center gap-2 px-12 py-2 hover:bg-primary-dark hover:text-bg border-0 font-semibold"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
