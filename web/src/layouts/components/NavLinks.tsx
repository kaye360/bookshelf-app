import { BookIcon, DashboardIcon, HomeIcon, PlusIcon, UsersIcon } from "../../components/common/Icon";

export interface NavLinks {
    Icon   : ({className, size} : {className? : string, size? : number}) => JSX.Element,
    title  : string,
    to     : string,
    access : 'GUEST' | 'USER' | 'ALL'
}

export const navLinks : NavLinks[] = [
    { 
        Icon : DashboardIcon,
        title : 'Dashboard',  
        to : '/dashboard',
        access : 'USER' 
    },
    { 
        Icon : BookIcon,
        title : 'My Bookshelf',
        to : '/bookshelf',
        access : 'USER' 
    },
    { 
        Icon : HomeIcon,
        title : 'Home',  
        to : '/',
        access : 'GUEST' 
    },
    { 
        Icon : UsersIcon,
        title : 'Community Feed',
        to : '/community',
        access : 'ALL' 
    },
    { 
        Icon : PlusIcon,
        title : 'Add Book',
        to : '/add',
        access : 'USER' 
    },
]