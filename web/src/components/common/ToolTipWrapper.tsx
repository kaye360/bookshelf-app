
export default function ToolTipWrapper({className='', children} : {className?: string, children : any}) {

    return (
        <div className={`relative group/tooltip ${className}`}>
            {children}
        </div>
    )
}
