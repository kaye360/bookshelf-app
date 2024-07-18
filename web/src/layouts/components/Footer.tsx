import Logo from "./Logo";
import Wrapper from "./Wrapper";

export default function Footer() {

    function handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="relative -z-10 pt-12 py-36">
            <Wrapper>
                <div className="w-fit mx-auto">
                    <button onClick={handleClick}>
                        Back to Top
                    </button>
                    <Logo />
                </div>
            </Wrapper>
        </div>
    )
}
