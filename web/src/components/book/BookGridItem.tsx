import { UserBook } from "../../lib/book/types";


export default function BookGridItem({book} :  { book : UserBook}) {
    return (
        <div className="bg-bg-accent border border-primary/20 rounded-lg p-6 w-[180px] aspect-[2/3]">
            {book.title ? book.title : 'helllo'}
        </div>
    )
}
