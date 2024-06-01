import { UserBook } from "../../lib/book/types";


export default function BookGridItem({book} :  { book : UserBook}) {
    return (
        <div className="bg-bg-accent border border-primary-light/20 rounded-lg p-6 aspect-[2/3]">
            {book.title}
        </div>
    )
}
