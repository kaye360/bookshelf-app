import Logo from "./Logo";
import Wrapper from "./Wrapper";

export default function Footer() {

    function handleClick() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="py-24">
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
