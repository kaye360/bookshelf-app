import { Link } from "react-router-dom";
import Logo from "./Logo";
import Wrapper from "./Wrapper";
import { useStore } from "../../store/store";

export default function Footer() {

    const { auth } = useStore()

    return (
        <footer className="relative -z-0 pb-12 bg-primary-light/20">
            <Wrapper>
                <div className="flex flex-col items-center gap-6">

                    <button 
                        onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="cursor-pointer hover:underline mt-6"
                    >
                        Back to Top
                    </button>

                    <div className="flex gap-6">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        { auth.isAuth && (
                            <Link to="/dashboard">Dashboard</Link>
                        )}
                        { !auth.isAuth && (
                            <>
                                <Link to="/login">Log In</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </div>

                    <p className="flex items-center justify-center flex-wrap gap-2">
                        <span className="w-full text-center">Project developed by Josh Kaye</span>
                        <a href="https://joshkaye.dev" target="_blank">Portfolio</a>
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        <a href="https://github.com/kaye360" target="_blank">GitHub</a>
                    </p>

                    <Logo />

                </div>
            </Wrapper>
        </footer>
    )
}
