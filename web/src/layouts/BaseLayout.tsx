import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import Wrapper from "../components/layout/Wrapper";
import { ReactNode } from "react";

export default function BaseLayout({children} : {children? : ReactNode}) {
    
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