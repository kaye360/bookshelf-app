
export default function AccountDropDown({
    showDropDown,
    children
} : {
    showDropDown : boolean,
    children : any
}) {
    return (
        <div 
            id="acount-drop-down"
            className={`
                absolute top-full right-0 w-fit bg-bg z-[9999999] grid gap-3 transition-all overflow-hidden shadow-lg origin-top-right rounded-lg
                ${showDropDown ? 'py-2 max-h-[200px] scale-1' : 'py-0 max-h-0 scale-0'}
            `}
        >

            {children}

        </div>
    )
}
