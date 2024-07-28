import { Link } from "react-router-dom";
import Logo from "./Logo";
import Wrapper from "./Wrapper";
import Divider from "../../components/common/Divider";

export default function Footer() {

    return (
        <div className="relative pb-12">
            <Wrapper>
                <div className="flex flex-col items-center gap-6">

                    <Divider />

                    <button 
                        onClick={ () => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="cursor-pointer hover:underline mt-6"
                    >
                        Back to Top
                    </button>

                    <div className="flex gap-6">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/help">Help</Link>
                    </div>

                    <Logo />
                </div>
            </Wrapper>
        </div>
    )
}
