import { UserBook } from "../../book/types/types";
import BookTableCell from "./BookTableCell";
import UserActions from "./UserActions";

export default function BookTableRow({book} : {book : UserBook}) {
    return (
        <tr className=" even:bg-bg-accent">
                <BookTableCell><img src={book.image.url} /></BookTableCell>
                <BookTableCell>
                    <span className="font-semibold">
                        {book.title}
                    </span>
                </BookTableCell>
                <BookTableCell>{book.authors}</BookTableCell>
                <BookTableCell>{book.tags}</BookTableCell>
                <BookTableCell><UserActions book={book} /></BookTableCell>
        </tr>
    )
}


