
export default function BookTableCell({className, children} : {className? : string, children? : any}) {
    return (
        <td className={`p-4 ${className}`}>
            {children}
        </td>
    )
}