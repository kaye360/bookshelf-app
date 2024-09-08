import Footer from "./components/Footer";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import { ReactNode, useEffect } from "react";
import { useStore } from "../store/store";
import { HTML_TITLE } from "../config";
import { navLinks } from "./components/NavLinks";

export default function BaseLayout({
    title,
    children
} : {
    title : string
    children? : ReactNode
}) {

    document.title = title === ''
        ? HTML_TITLE
        : `${title} - ${HTML_TITLE}`

    const { settings } = useStore()

    useEffect( () => {
        const html = document.querySelector('html') as HTMLHtmlElement
        html.classList.toggle('dark', settings?.theme === 'dark')
    }, [settings?.theme])

    useEffect( () => {
        scrollTo({ top : 0, behavior : 'instant'})
    }, [window.location.href])
    
    return (
        <div className="flex flex-col justify-start relative z-0 min-h-[101vh]">
            <Header />
            <Nav navLinks={navLinks} />
            <main className="relative z-10">
                <Wrapper id="main-inner-content">
                    {children}
                </Wrapper>
            </main>
            <Footer />
        </div>
    )
} 