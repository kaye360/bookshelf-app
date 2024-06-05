import BookTableCell from "./BookTableCell";

export default function BookTable({children} : {children?:any}) {
  return (
    <div className="max-w-[100vw] overflow-auto">
        <table className="w-full">

            <thead>
                <tr className="font-semibold">
                    <BookTableCell>Cover</BookTableCell>
                    <BookTableCell>Title</BookTableCell>
                    <BookTableCell>Authors</BookTableCell>
                    <BookTableCell>Read?</BookTableCell>
                    <BookTableCell>Favorite?</BookTableCell>
                </tr>
            </thead>

            <tbody>
                {children}
            </tbody>
        
        </table>
    </div>
  )
}
