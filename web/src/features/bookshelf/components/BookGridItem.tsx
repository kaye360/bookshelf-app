import { UserBook } from "../../book/types/types";
import BookTitle from "./BookTitle";
import UserActions from "./UserActions";


export default function BookGridItem({book} :  { book : UserBook}) {

    const hasImage = book.image.url.includes('google')

    return (
        <div className={` grid gap-2 text-primary-light ${ !hasImage ? 'bg-primary-light/10 rounded min-h-56 p-1 items-end' : '' } `}>

            { hasImage ? (
                <img 
                    src={book.image.url} 
                    className="w-full aspect-[2/3] object-cover rounded-md"
                />
            ) : (
                <BookTitle>
                    {book.title}
                </BookTitle>
            )}

            <UserActions book={book} />

        </div>
    )
}
