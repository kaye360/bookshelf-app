import { Link, useLocation } from "react-router-dom";


export default function NavLink({
    to, 
    children
} : { 
    to: string, 
    children : any
}) {

    const {pathname} = useLocation()

    let isActive = false

    if( to === '/' && pathname === '/' ) {
        isActive = true
    } 

    if( to !== '/' ) {
        isActive = pathname.includes(to)
    }

    return (
        <li>
            <Link 
                to={to}
                className={`
                    flex items-center gap-[5px] px-5 py-2 min-w-max 
                    transition-all 
                    text-primary-dark hover:text-bg 
                    ${ isActive ? 'bg-primary-light' : ''} hover:bg-accent 
                    font-semibold tracking-wider 
                    rounded border-0 
                 `}
            >
                {children}
            </Link>
        </li>
    )
}
