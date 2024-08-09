import { BookIcon, DashboardIcon, HomeIcon, PlusIcon, UsersIcon } from "../../components/common/Icon";
import NavLink from "./NavLink";
import NavLinkTitle from "./NavLinkTitle";

export function DashboardNavLink() {
    return (
        <NavLink to="/dashboard">
            <DashboardIcon size={18} />
            <NavLinkTitle>Dashboard</NavLinkTitle>
        </NavLink>
    )
}

export function BookshelfNavLink() {
    return (
        <NavLink to="/bookshelf">
            <BookIcon size={18} />
            <NavLinkTitle>My Bookshelf</NavLinkTitle>
        </NavLink>
    )
}

export function HomeNavLink() {
    return (
        <NavLink to="/">
            <HomeIcon size={18} />
            <NavLinkTitle>Home</NavLinkTitle>
        </NavLink>
    )
}

export function CommunityNavLink() {

    return (
        <NavLink to="/community">
            <UsersIcon size={18} />
            <NavLinkTitle>Community Feed</NavLinkTitle>
        </NavLink>
    )
}

export function AddBookNavLink() {
    return (
        <NavLink to="/add">
            <PlusIcon size={22} />
            <NavLinkTitle>Add a Book</NavLinkTitle>
        </NavLink>
    )
}