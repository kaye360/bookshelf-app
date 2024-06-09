
export default function ToolTip({title} : {title : string}) {

    return (
        <div 
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 z-0 top-[135%] bg-primary-dark/95 text-bg text-xs px-4 py-2 rounded transition-opacity delay-300 pointer-events-none opacity-0 group-hover/tooltip:opacity-100"
        >
            <span className="relative z-10 bg-primary-dark/95 font-medium tracking-wider">
                {title}
            </span>

            <div className="absolute left-1/2 -translate-x-1/2 -z-10 top-[-5px] w-[10px] h-[10px] rotate-45 bg-primary-dark/95 rounded-sm" />
        </div>
    )
}
