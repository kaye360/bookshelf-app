import { NavLinks } from "./NavLinks";

export const navLinksMock : NavLinks[] = [
    { 
        // @ts-expect-error
        Icon : () => 'Icon1',
        title : 'Link1',  
        to : '/link1',
        access : 'USER' 
    },
    { 
        // @ts-expect-error
        Icon : () => 'Icon2',
        title : 'Link2',  
        to : '/link2',
        access : 'USER' 
    },
    { 
        // @ts-expect-error
        Icon : () => 'Icon3',
        title : 'Link3',  
        to : '/link3',
        access : 'GUEST' 
    },
    { 
        // @ts-expect-error
        Icon : () => 'Icon4',
        title : 'Link4',  
        to : '/link4',
        access : 'GUEST' 
    },
    { 
        // @ts-expect-error
        Icon : () => 'Icon5',
        title : 'Link5',  
        to : '/link5',
        access : 'ALL' 
    },
    { 
        // @ts-expect-error
        Icon : () => 'Icon6',
        title : 'Link6',  
        to : '/link6',
        access : 'ALL' 
    },
]
