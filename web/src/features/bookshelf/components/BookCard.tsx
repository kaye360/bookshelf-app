import UserActions from "./UserActions";
import { Book } from "../../../types/types";
import { useBookshelfParams } from "../hooks/useBookShelfParamsContext";


export default function BookCard({
    book
} : {
    book: Book
}) {

    const { updateSearchParam } = useBookshelfParams()

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-3 text-sm">
            
            <div className="bg-slate-300 aspect-[1/1.6]">
                <img src={book.imageUrl} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold">
                    {book.title}
s               </span>

                <div>
                    {book.authors}
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    {book.tags.map( tag => (
                        <button
                            key={tag}
                            onClick={() => { 
                                updateSearchParam('filterBy', tag)
                                console.log('poopoopeepee')
                            }}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>

                <UserActions book={book} />
            </div>
        </div>
    )
}
