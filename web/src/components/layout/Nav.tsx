import { useAuth } from "../../features/auth/components/AuthProvider";
import Wrapper from "./Wrapper";
import { AddBookNavLink, BookshelfNavLink, CommunityNavLink, DashboardNavLink, HomeNavLink } from "./NavLinks";

export default function Nav() {

    const { isAuth } = useAuth()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:static bg-bg py-4 md:py-0 max-w-[100vw]">
            <Wrapper className="!py-0">
                <ul className={`flex items-center gap-6 ${ isAuth ? 'justify-between' : 'justify-start'}`}>
                    { isAuth ? (
                        <>
                            <DashboardNavLink />
                            <BookshelfNavLink />
                        </>
                    ) : (
                        <>
                            <HomeNavLink />
                        </>
                    )}

                    <CommunityNavLink />

                    { isAuth && <AddBookNavLink /> }
                </ul>
            </Wrapper>
        </nav>
    )
}
