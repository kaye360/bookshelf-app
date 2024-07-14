

export const Tooltip = {
    Text,
    Wrapper
}


function Text({title} : {title : string}) {

    return (
        <div 
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-[9999] bottom-full group-hover/tooltip:bottom-[135%] bg-primary-dark/95 text-bg text-xs px-4 py-1 rounded transition-all delay-200 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 min-w-max" 
        >
            <span className="relative z-10 bg-primary-dark/95 font-medium tracking-wider">
                {title}
            </span>

            <div className="absolute left-1/2 -translate-x-1/2 -z-10 bottom-[-5px] w-[10px] h-[10px] rotate-45 bg-primary-dark/95 rounded-sm" />
        </div>
    )
}


function Wrapper({className='', children} : {className?: string, children : any}) {

    return (
        <div className={`relative z-50 group/tooltip ${className}`}>
            {children}
        </div>
    )
}