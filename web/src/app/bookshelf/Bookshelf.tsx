import BaseLayout from "../../layouts/BaseLayout";
import { BookIcon, PlusIcon } from "../../components/common/Icon";
import Button from "../../components/form/Button";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/store";
import { BookShelfContext } from "./hooks/useBookShelfContext";
import SearchBar from "./components/searchbar/SearchBar";
import useBookShelfView from "./hooks/useBookShelfView";
import Loader from "../../components/common/Loader";
import useBookshelfParams from "./hooks/useBookShelfParams";

export default function BookShelf() {

    const { books, booksStatus } = useStore()
    const navigate = useNavigate()

    const {
        searchParams,
        updateSearchParam,
        resolvedBooks
    } = useBookshelfParams()

    const {
        BookList,
        BookListItem
    } = useBookShelfView(searchParams)

    return (
        <BaseLayout>

            <BookShelfContext.Provider value={{searchParams, updateSearchParam}}>

                <SearchBar />

                { booksStatus === 'LOADING' && (
                    <Loader message="Loading your bookshelf" />
                )}

                { booksStatus === 'SUCCESS' && (
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
                
            </BookShelfContext.Provider>

        </BaseLayout>
    )
} 
