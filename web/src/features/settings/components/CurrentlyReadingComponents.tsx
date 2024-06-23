import { Dispatch, SetStateAction, useState } from "react"
import TextInput from "../../../components/form/TextInput"
import { useAuth } from "../../auth/hooks/useAuth"
import { UserBook } from "../../book/types/types"


export const CurrentlyReading = {
    Preview,
    Selector
}


function Preview({
    book
} : {
    book : UserBook
}) {
    return (
        <div className="flex items-start gap-4 mb-2">

            <img src={book.image.url} className="w-24" />

            <div className="grid gap-2">
                
                <h3 className="font-medium text-xl">
                    {book.title}
                </h3>

                <span>
                    {book.authors}
                </span>

                <div className="flex flex-wrap gap-3 text-sm">
                    {book.tags.map( tag => (
                        <span key={tag}>
                            #{tag}
                        </span>
                    ))}
                </div>

            </div>

        </div>
    )
}


export default function Selector({
    touchForm,
    bookId,
    setBookId,
    showEditForm
} : {
    touchForm    : () => void
    bookId       : string
    setBookId    : Dispatch<SetStateAction<string>>
    showEditForm : boolean
}) {

    const { user } = useAuth()
    const [searchQuery, setSearchQuery] = useState<string>('')

    const booklist = user?.books.filter( book => 
        book.title.toLowerCase().includes(searchQuery) || 
        book.authors.toLowerCase().includes(searchQuery)
    )

    function handleClick(id : string) {
        touchForm()
        setBookId(id)
    }

    return (
        <div className={`overflow-hidden transition-all px-1 ${showEditForm ? 'max-h-[400px] pt-1' : 'max-h-[0px]'}`}>

            <TextInput 
                name='currentlyReadingId'
                value={searchQuery}
                placeholder="Search for a book in your library..."
                onChange={ (e) => setSearchQuery(e.target.value.toLowerCase())}
            />

            <div className="w-full max-w-xl h-64 overflow-y-scroll">
                { booklist && booklist.map( (book,i) => (
                    <button 
                        type="button"
                        onClick={ () => handleClick(book.id) }
                        className={`
                            flex gap-4 items-center overflow-hidden w-full hover:bg-primary-light/50
                            ${ bookId === book.id ? 'bg-primary-light/50' : ''}
                        `}
                        key={i}
                    >
                        <img src={book.image.url} className="h-16 w-10 object-cover" />
                        <span className="font-bold min-w-max">
                            {book.title}
                        </span>
                        <span className="min-w-max">
                            {book.authors}
                        </span>
                    </button>
                ))}
            </div>

            <input type="hidden" name="currentlyReadingId" value={bookId || ''} />

        </div>
    )
}
