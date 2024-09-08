import Wrapper from "./Wrapper";
import { NavLinks } from "./NavLinks";
import { useStore } from "../../store/store";
import { Fragment } from "react/jsx-runtime";
import NavLink from "./NavLink";

export default function Nav({
    navLinks
} : {
    navLinks : NavLinks[]
}) {

    const { auth : { isAuth } } = useStore()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:static bg-bg md:bg-primary-light/20 py-4 md:py-2 max-w-[100vw]">
            <Wrapper className="!py-0">
                <ul className={`flex items-center gap-6 ${ isAuth ? 'justify-evenly' : 'justify-start'}`}>
                    { navLinks.map( (link,i) => (
                        <Fragment key={i}>
                            { isNavlinkShown({link, isAuth})  && (
                                <NavLink to={link.to}>
                                    <link.Icon />
                                    {link.title}
                                </NavLink>
                            )}
                        </Fragment>
                    ))}
                </ul>
            </Wrapper>
        </nav>
    )
}

export function isNavlinkShown({
    link,
    isAuth
} : {
    link : NavLinks,
    isAuth : boolean
}) : boolean {

    if( link.access === 'USER'  && isAuth ) {
        return true
    }

    if( link.access === 'GUEST' && !isAuth ) {
        return true
    }

    if( link.access === 'ALL' ) {
        return true
    }

    return false
}