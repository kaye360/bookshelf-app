import BaseLayout from "../layouts/BaseLayout";
import { BookIcon, LoaderIcon, PlusIcon } from "../components/common/Icon";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import { BookShelfContext } from "../features/bookshelf/hooks/bookShelfContext";
import useSearchBarParams from "../features/bookshelf/hooks/useSearchBarParams";
import FilterOptions from "../features/bookshelf/components/searchbar/FilterOptions";
import SearchBar from "../features/bookshelf/components/searchbar/SearchBar";
import TagOptions from "../features/bookshelf/components/searchbar/TagOptions";



export default function BookShelf() {

    const { books, booksStatus } = useStore()
    const navigate = useNavigate()

    const {
        searchParams,
        setSearchParams,
        updateSearchParam,
        BookList,
        BookListItem
    } = useSearchBarParams()

    return (
        <BaseLayout>

            <BookShelfContext.Provider value={{searchParams, setSearchParams, updateSearchParam}}>
                <div className="grid gap-3 mt-2 mb-8">
                    <SearchBar />
                    <FilterOptions />
                    <TagOptions />
                </div>

                { booksStatus === 'LOADING' && (
                    <div className="flex items-center gap-3 bg-primary-light/25 px-6 py-12 text-2xl rounded-lg ">
                        <LoaderIcon size={32} />
                        Loading your library...
                    </div>
                )}

                { booksStatus === 'SUCCESS' && (
                    <BookList>
                        {books.map( book => (
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
