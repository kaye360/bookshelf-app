import NavLink from "./NavLink";
import NavLinkTitle from "./NavLinkTitle";


export function DashboardNavLink() {
    return (
        <NavLink to="/dashboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-layout w-6 h-6 md:w-auto md:h-auto"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
            <NavLinkTitle>Dashboard</NavLinkTitle>
        </NavLink>
    )
}

export function BookshelfNavLink() {
    return (
        <NavLink to="/bookshelf">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-book w-6 h-6 md:w-auto md:h-auto"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            <NavLinkTitle>My Bookshelf</NavLinkTitle>
        </NavLink>
    )
}

export function HomeNavLink() {
    return (
        <NavLink to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home w-6 h-6 md:w-auto md:h-auto"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <NavLinkTitle>Home</NavLinkTitle>
        </NavLink>
    )
}

export function CommunityNavLink() {

    return (
        <NavLink to="/community">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users w-6 h-6 md:w-auto md:h-auto"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <NavLinkTitle>Community</NavLinkTitle>
        </NavLink>
    )
}

export function AddBookNavLink() {
    return (
        <NavLink 
            to="/add"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square w-6 h-6 md:w-auto md:h-auto"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            <NavLinkTitle>Add a Book</NavLinkTitle>
        </NavLink>
    )
}