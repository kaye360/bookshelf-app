import { Link, useLocation } from "react-router-dom";


export default function NavLink({to, children} : { to: string, children : any}) {

    const {pathname} = useLocation()
    const isActive = pathname.includes(to)

    return (
        <li>
            <Link 
                to={to}
                className={`flex items-center gap-1 hover:underline px-5 py-2 rounded transition-colors hover:bg-accent hover:text-bg -translate-x-[12px] last:translate-x-0 font-semibold tracking-wider min-w-max ${ isActive ? 'bg-primary text-bg' : ''}`}
            >
                {children}
            </Link>
        </li>
    )
}
