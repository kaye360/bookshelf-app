import { UserBook } from "../../lib/book/types";

export default function BookCard({book} : {book: UserBook}) {
    return (
        <div className="grid grid-cols-[1fr_2fr] gap-4">
            
            <div className="bg-slate-300 aspect-[1/1.6]">Cover</div>

            <div className="">
                {book.title}
            </div>
        </div>
    )
}
