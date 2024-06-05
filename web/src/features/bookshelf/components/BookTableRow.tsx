import { UserBook } from "../../lib/book/types";
import BookTableCell from "./BookTableCell";

export default function BookTableRow({book} : {book : UserBook}) {
    return (
        <tr className=" even:bg-bg-accent">
                <BookTableCell><img src={book.image.url} /></BookTableCell>
                <BookTableCell>{book.title}</BookTableCell>
                <BookTableCell>{book.authors}</BookTableCell>
                <BookTableCell>{book.isRead ? 'Read' : 'Unread'}</BookTableCell>
                <BookTableCell>{book.isFavourite ? 'Fav' : ''}</BookTableCell>
        </tr>
    )
}


