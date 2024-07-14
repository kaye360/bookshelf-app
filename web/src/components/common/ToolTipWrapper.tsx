
export default function ToolTipWrapper({className='', children} : {className?: string, children : any}) {

    return (
        <div className={`relative z-50 group/tooltip ${className}`}>
            {children}
        </div>
    )
}
