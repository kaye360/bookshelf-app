import { UserBook } from "../../book/types/types";
import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon } from "../../../components/common/Icon";
import BookTitle from "./BookTitle";


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

            <div className="flex items-center gap-3 mt-auto">
                <FavouritesIcon className={book.isFavourite ? 'fill-accent/50 stroke-accent/50' : ''} />
                <CheckIcon size={18} />
                <BookmarkIcon size={18} className={book.group === 'owned' ? 'fill-primary-light/50 stroke-primary-light/50' : ''} />
                <MoreIcon size={18} className="ml-auto" />
            </div>

        </div>
    )
}
