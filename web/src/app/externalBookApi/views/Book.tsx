import BaseLayout from "../../../layouts/BaseLayout";
import { CheckIcon, PlusIcon } from "../../../components/common/Icon";
import BookCover from "../../../components/common/BookCover";
import Button from "../../../components/form/Button";
import AddBookModal from "../components/AddBookModal";
import useCreateBook from "../hooks/useCreateBook";
import useBookData from "../hooks/useBookData";
import { userHasBook } from "../../bookshelf/services/userHasBook";
import Loader from "../../../components/common/Loader";

export default function Book() {

    const { key, bookQuery, authors} = useBookData()
    
    const {
        createBook,
        isAddModalOpen,
        setIsModalOpen,
        handleAddBook
    } = useCreateBook({
        key,
        bookQuery
    })

    return (
        <BaseLayout>

            { bookQuery.isSuccess && !bookQuery.isRefetching && (

                <div className="grid md:grid-cols-[1fr_300px] items-start gap-x-12 gap-y-8 md:gap-y-4">

                    <h1 className="font-semibold text-2xl md:col-span-2">
                        { bookQuery.data?.title}
                    </h1>

                    <div className="flex items-start flex-wrap md:flex-nowrap gap-4">

                        <div className="grid gap-2">
                            { Array.isArray( bookQuery.data?.covers ) && bookQuery.data?.covers[0] && (
                                <BookCover 
                                    size="lg" 
                                    autoHeight
                                    title={bookQuery.data.title}
                                    src={`https://covers.openlibrary.org/b/id/${bookQuery.data?.covers[0]}-M.jpg`}
                                />
                            )}
                            <div>
                                { userHasBook(key) ? (                            
                                    <span className="flex gap-2 justify-center items-center min-w-max px-6 py-2 text-sm text-accent border border-accent/30 rounded-lg w-full select-none">
                                        <CheckIcon />
                                        Added
                                    </span>
                                ) : (
                                    <Button 
                                        variant="outline"
                                        className="w-full"
                                        onClick={ handleAddBook }
                                    >
                                        <PlusIcon />
                                        Add Book
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            <div>
                                <h2 className="font-semibold">
                                    About this book
                                </h2>
                                <span className="text-sm italic">
                                    Source: OpenLibrary.org
                                </span>
                            </div>
                            <p>
                                Published: { bookQuery.data.first_publish_date || 'Not Available' }
                            </p>
                            <p>
                                Description: <br />
                                { bookQuery.data?.description?.value || 'Not Available'} 
                            </p>

                        </div>



                    </div>

                    <div className="grid gap-3">

                        <h2 className="font-semibold">
                            Authors
                        </h2>

                        { authors.data?.map( author => (
                            <div className="flex items-start gap-4 border border-primary-light/50 rounded-lg p-6 shadow-sm shadow-primary-light/50" key={author.key}>

                                {author.photos && author.photos[0] ? (
                                    <img 
                                        src={`https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`}
                                        className="w-[75px] h-auto"
                                    />
                                ) : (
                                    <span className="w-[75px] h-[75px] bg-primary-light/30" />
                                )}

                                <div>
                                    <h3 className="font-semibold">
                                        {author.name}
                                    </h3>
                                    {author.birth_date && (
                                        <p>
                                            Born: {author.birth_date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            )}

            { bookQuery.isRefetching || bookQuery.isFetching && (
                <Loader message="Loading book" />
            )}

            { isAddModalOpen && createBook && (
                <AddBookModal book={ createBook } closeModalFn={ () => setIsModalOpen(false) } />
            )}
        </BaseLayout>
    )
} 