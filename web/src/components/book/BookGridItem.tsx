import { UserBook } from "../../lib/book/types";


export default function BookGridItem({book} :  { book : UserBook}) {
    return (
        <div className="bg-primary-light/20 overflow-hidden rounded-lg aspect-[2/3]">

            { book.image.url.includes('google') &&
                <img 
                    src={book.image.url} 
                    className="w-full h-full object-cover"
                />
            }
        </div>
    )
}
