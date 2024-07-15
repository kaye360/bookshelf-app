import { useState } from "react";
import { EditIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import { useStore } from "../../../store/store";
import TextInput from "../../../components/form/TextInput";
import { UserBook } from "../../../types/types";



export default function CurrentlyReadingSettings({
    touchForm
} : {
    touchForm : () => void
}) {

    const { settings, books } = useStore()

    const [ showEditForm, setShowEditForm ] = useState(false)

    const [ searchQuery, setSearchQuery ] = useState<string>('')

    const [bookId, setBookId] = useState<string|null|undefined>(settings?.currentlyReadingId)
 
    
    let currentBook = books
        ? books.filter( book => book.id === Number(bookId))[0]
        : null
    
    function handleSelectBook(book : UserBook) {
        setBookId( book.id.toString() )
        touchForm()
    }

    return (
        <div>
 
            <div className="flex items-center justify-between max-w-xl mb-2">
                <h2 className="text-lg font-medium">    
                    Currently Reading 
                </h2>

                <Button 
                    type="button"
                    variant="ghost"
                    onClick={ () => setShowEditForm(prev => !prev) }
                >
                    Edit
                    <EditIcon />
                </Button>

            </div>

            { currentBook && (
                <div 
                    id="currently-reading-preview"
                    className="flex items-start gap-4 mb-2"
                >

                    <img src={currentBook.image.url} className="w-24" />
        
                    <div className="grid gap-2">
                        
                        <h3 className="font-medium text-xl">
                            {currentBook.title}
                        </h3>
        
                        <span>
                            {currentBook.authors}
                        </span>
        
                        <div className="flex flex-wrap gap-3 text-sm">
                            {currentBook.tags.map( tag => (
                                <span key={tag}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
        
                    </div>
        
                </div>
            )}

            <div 
                id="currently-reading-selector"
                className={`overflow-hidden max-w-full transition-all px-1 ${showEditForm ? 'max-h-[400px] pt-1' : 'max-h-[0px]'}`}
            >

                <TextInput 
                    name='currentlyReadingId'
                    value={searchQuery}
                    placeholder="Search for a book in your library..."
                    onChange={ (e) => {
                        setSearchQuery(e.target.value.toLowerCase())
                        touchForm()
                    }}
                />

                <div className="w-full max-w-sm md:max-w-xl h-64 overflow-y-scroll">
                    <div className="grid gap-2 overflow-x-hidden">
                        { books.map( (book,i) => (
                            <button 
                                type="button"
                                onClick={ () => handleSelectBook(book) }
                                className={`
                                    flex gap-4 items-center hover:bg-primary-light/50 text-left
                                    ${ bookId === book.id.toString() ? 'bg-primary-light/50' : ''}
                                `}
                                key={i}
                            >

                                <img src={book.image.url} className="h-20 w-10 object-cover" />

                                <div className="grid max-w-[70vw] overflow-hidden">
                                    <span className="font-bold min-w-max">
                                        {book.title}
                                    </span>
                                    <span className="min-w-max">
                                        {book.authors}
                                    </span>
                                </div>

                            </button>
                        ))}
                    </div>
                </div>

                <input type="hidden" name="currentlyReadingId" value={bookId || undefined} />

            </div>

        </div>
    )
}
