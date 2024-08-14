import BaseLayout from "../../../layouts/BaseLayout";
import { BookIcon, PlusIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/store";
import SearchBar from "../components/searchbar/SearchBar";
import Loader from "../../../components/common/Loader";
import useBookshelfParams from "../hooks/useBookshelfParams";
import { BookListResolver } from "../services/BookListResolver";
import useBookshelfView from "../hooks/useBookshelfView";
import useBookshelfSort from "../hooks/useBookshelfSort";
import useBookshelfFilter from "../hooks/useBookshelfFilter";

export default function BookShelf() {

    const { books, booksStatus,settingsStatus } = useStore()

    const navigate = useNavigate()

    const { searchParams }           = useBookshelfParams()
    const { BookList, BookListItem } = useBookshelfView()
    const sortBy                     = useBookshelfSort()
    const filterBy                   = useBookshelfFilter()
    const taggedAs                   = searchParams.get('taggedAs')
    const searchQuery                = searchParams.get('searchQuery')

    const bookListResolver = new BookListResolver({ books,  searchQuery, filterBy, taggedAs, sortBy, })
    const resolvedBooks = bookListResolver.resolve()

    return (
        <BaseLayout title="My Bookshelf">

            <SearchBar />

            { booksStatus === 'LOADING' || settingsStatus === 'LOADING' && (
                <Loader message="Loading your bookshelf" />
            )}

            { booksStatus === 'SUCCESS' && settingsStatus === 'SUCCESS' && resolvedBooks && (
                <BookList>
                    {resolvedBooks.map( book => (
                        <BookListItem book={book} key={book.id} />
                    ))}
                </BookList>
            )}

            { booksStatus === 'SUCCESS' && books.length === 0 && (
                <>
                    <div className="text-2xl flex items-center justify-center gap-2 my-4">
                        <BookIcon />
                        <p>
                            Your library is empty.
                        </p>
                    </div>
                    <div  className="flex justify-center">
                        <Button variant="outline" onClick={ () => navigate('/add')}>
                            <PlusIcon />
                            Add some books
                        </Button>
                    </div>
                </>
            )}

        </BaseLayout>
    )
} 
