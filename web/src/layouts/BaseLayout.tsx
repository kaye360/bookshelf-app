import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import Wrapper from "../components/layout/Wrapper";
import { ReactNode, useEffect } from "react";

export default function BaseLayout({children} : {children? : ReactNode}) {

    // useEffect( () => {
    //     scrollTo({ top : 0, behavior : 'instant'})
    // }, [window.location])
    
    return (
        <>
            <Header />
            <Nav />
            <main className="relative z-0">
                <Wrapper>
                    {children}
                </Wrapper>
            </main>
            <Footer />
        </>
    )
} 