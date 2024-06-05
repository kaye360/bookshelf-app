import { useContext } from "react";
import { UserBook } from "../../book/types/types";
import { BookShelfContext } from "../../../routes/bookshelf/Books";
import { FavouritesIcon, CheckIcon, BookmarkIcon, MoreIcon } from "../../../components/common/Icon";
import BookTitle from "./BookTitle";

export default function BookCard({book} : {book: UserBook}) {

    const { updateSearchParam } = useContext(BookShelfContext)

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3">
            
            <div className="bg-slate-300 aspect-[1/1.6]">
                <img src={book.image.url} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-1">
                <BookTitle>
                    {book.title}
                </BookTitle>

                <div>
                    {book.authors}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    {book.tags.map( tag => (
                        <button
                            key={tag}
                            onClick={() => updateSearchParam('filterBy', tag)}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                    <FavouritesIcon className={book.isFavourite ? 'fill-accent/50 stroke-accent/50' : ''} />
                    <CheckIcon size={18} />
                    <BookmarkIcon size={18} className={book.group === 'owned' ? 'fill-primary-light/50 stroke-primary-light/50' : ''} />
                    <MoreIcon size={18} className="ml-auto" />
                </div>
            </div>
        </div>
    )
}
