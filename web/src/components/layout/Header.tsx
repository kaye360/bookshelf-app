import Wrapper from "./Wrapper";
import Logo from "./Logo";
import Account from "./Account";

export default function Header() {

    return (
        <header>
            <Wrapper className="flex justify-between w-full !py-2">
                <Logo />
                <Account />
            </Wrapper>
        </header>
    )
}
