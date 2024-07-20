import { useParams } from "react-router-dom";
import BaseLayout from "../../layouts/BaseLayout";
import useSingleExternalApiBook from "../externalBookApi/api/getSingleExternalApiBook";
import { LoaderIcon } from "../../components/common/Icon";
import useSingleExternalApiAuthors from "../externalBookApi/api/getSingleExternalApiAuthors";
import BookCover from "../../components/common/BookCover";

export default function Book() {

    const params = useParams()
    const book = useSingleExternalApiBook(params.id)
    const authors = useSingleExternalApiAuthors(book.data?.authors)
    
    return (
        <BaseLayout>

            { book.isSuccess && !book.isRefetching && (
                <div className="grid grid-cols-2">

                    <div>
                        <h1 className="font-semibold text-2xl">
                            { book.data?.title}
                        </h1>

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
                    </div>

                    <div className="grid gap-3">

                        { authors.data?.map( author => (
                            <div className="flex items-start gap-4" key={author.key}>

                                {author.photos && author.photos[0] && (
                                    <img 
                                        src={`https://covers.openlibrary.org/a/id/${author.photos[0]}-M.jpg`}
                                        className="w-[100px] h-auto"
                                    />
                                )}

                                <div className="">

                                    <h3 className="font-semibold">
                                        {author.name}
                                    </h3>
                                    <p>
                                        {author.bio}
                                    </p>

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