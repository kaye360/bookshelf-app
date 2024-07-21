import { useNavigate, useParams } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout";
import useSingleExternalApiBook from "../externalBookApi/api/getSingleExternalApiBook";
import { LoaderIcon, PlusIcon } from "../../components/common/Icon";
import useSingleExternalApiAuthors from "../externalBookApi/api/getSingleExternalApiAuthors";
import BookCover from "../../components/common/BookCover";
import Button from "../../components/form/Button";

export default function Book() {

    const params = useParams()
    const book = useSingleExternalApiBook(params.id)
    const authors = useSingleExternalApiAuthors(book.data?.authors)
    const navigate = useNavigate()

    console.log(book)
    
    return (
        <BaseLayout>

            { book.isSuccess && !book.isRefetching && (
                <div className="grid grid-cols-[auto_auto] items-start gap-6 w-fit mx-auto">

                    <div className="grid gap-2">
                        <h1 className="font-semibold text-2xl">
                            { book.data?.title}
                        </h1>

                        {book.data.first_publish_date && (
                            <p>
                                First published: {book.data.first_publish_date}
                            </p>
                        )}

                        { Array.isArray( book.data?.covers ) && book.data?.covers[0] && (
                            <BookCover 
                                size="lg" 
                                autoHeight
                                title={book.data.title}
                                src={`https://covers.openlibrary.org/b/id/${book.data?.covers[0]}-M.jpg`}
                            />
                        )}

                        <p>
                            {book.data?.description?.value}
                        </p>

                        <Button 
                            variant="outline"
                            onClick={ () => navigate(`/add?q=${book.data.title}`) }
                        >
                            <PlusIcon />
                            Add to my bookshelf
                        </Button>

                    </div>

                    <div className="grid gap-3">

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

            { book.isRefetching || book.isFetching && (
                <div>
                    <LoaderIcon />
                    Loading
                </div>
            )}
        </BaseLayout>
    )
} 