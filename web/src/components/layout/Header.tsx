import Wrapper from "./Wrapper";
import Logo from "./Logo";
import Account from "./Account";

export default function Header() {

    return (
        <header className="border-b border-primary-100">
            <Wrapper className="flex justify-between w-full">
                <Logo />
                <Account />
            </Wrapper>
        </header>
    )
}
