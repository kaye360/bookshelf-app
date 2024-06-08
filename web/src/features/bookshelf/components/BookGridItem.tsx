import { UserBook } from "../../book/types/types";
import BookTitle from "./BookTitle";
import UserActions from "./UserActions";


export default function BookGridItem({book} :  { book : UserBook}) {

    const hasImage = book.image.url.includes('google')

    return (
        <div className={` grid gap-1 text-primary-light `}>

            { hasImage ? (
                <img 
                    src={book.image.url} 
                    className="w-full aspect-[2/3] object-cover rounded-md"
                />
            ) : (
                <div className="bg-primary-light/5 text-primary-light/80 rounded min-h-64 p-4">
                    <BookTitle>
                        {book.title}
                    </BookTitle>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-x-2 text-xs overflow-hidden">
                {book.tags.map( (tag, i) => (
                    <a href={`/bookshelf/tag/${tag}`} key={i}>#{tag}</a>
                ))}
            </div>

            <UserActions book={book} />

        </div>
    )
}
