import Wrapper from "./Wrapper";
import { AddBookNavLink, BookshelfNavLink, CommunityNavLink, DashboardNavLink, HomeNavLink } from "./NavLinks";
import { useStore } from "../../store/store";
import { Fragment } from "react/jsx-runtime";

interface Navlinks {
    Component : () => JSX.Element,
    showTo    : 'GUEST' | 'USER' | 'ALL'
}

export default function Nav() {

    const { auth : { isAuth } } = useStore()

    const navLinks : Navlinks[] = [
        { Component : DashboardNavLink, showTo : 'USER' },
        { Component : BookshelfNavLink, showTo : 'USER' },
        { Component : HomeNavLink,      showTo : 'GUEST' },
        { Component : CommunityNavLink, showTo : 'ALL' },
        { Component : AddBookNavLink,   showTo : 'USER' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:static bg-bg md:bg-primary-light/20 py-4 md:py-2 max-w-[100vw]">
            <Wrapper className="!py-0">
                <ul className={`flex items-center gap-6 ${ isAuth ? 'justify-evenly' : 'justify-start'}`}>
                    { navLinks.map( (link,i) => (
                        <Fragment key={i}>
                            { link.showTo === 'USER'  && isAuth && <link.Component /> }
                            { link.showTo === 'GUEST' && !isAuth && <link.Component /> }
                            { link.showTo === 'ALL'   && <link.Component /> }
                        </Fragment>
                    ))}
                </ul>
            </Wrapper>
        </nav>
    )
}
