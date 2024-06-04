import { UserBook } from "../../lib/book/types";
import { BookmarkIcon, CheckIcon, FavouritesIcon, MoreIcon } from "../base/Icon";


export default function BookGridItem({book} :  { book : UserBook}) {

    const hasImage = book.image.url.includes('google')

    return (
        <div className={` grid gap-2 text-primary-light ${ !hasImage ? 'bg-primary-light/20 rounded min-h-56 p-1 items-end' : '' } `}>

            { hasImage ? (
                <img 
                    src={book.image.url} 
                    className="w-full aspect-[2/3] object-cover rounded-md"
                />
            ) : (
                <span className="text-medium text-lg mb-auto">
                    {book.title}
                </span>
            )}

            <div className="flex items-center gap-3">
                <FavouritesIcon className={book.isFavourite ? 'fill-accent/50 stroke-accent/50' : ''} />
                <CheckIcon size={18} />
                <BookmarkIcon size={18} className={book.group === 'owned' ? 'fill-primary-light/50 stroke-primary-light/50' : ''} />
                <MoreIcon size={18} className="ml-auto" />
            </div>

        </div>
    )
}
