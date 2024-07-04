import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import Wrapper from "../components/layout/Wrapper";
import { ReactNode, useEffect } from "react";
import { useStore } from "../store/store";

export default function BaseLayout({children} : {children? : ReactNode}) {

    const { auth : { user } } = useStore()

    useEffect( () => {
        const html = document.querySelector('html') as HTMLHtmlElement
        html.classList.toggle('dark', user?.settings?.theme === 'dark')
    }, [user?.settings?.theme])

    useEffect( () => {
        scrollTo({ top : 0, behavior : 'instant'})
    }, [window.location.href])
    
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