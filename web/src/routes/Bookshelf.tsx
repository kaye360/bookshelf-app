import BaseLayout from "../layouts/BaseLayout";
import SearchBar from "../features/searchbar/components/SearchBar";
import { createContext } from "react";
import { bookShelfContextInitialState } from "../features/bookshelf/services/initialState";
import FilterOptions from "../features/searchbar/components/FilterOptions";
import { BookShelfContextProps } from "../features/bookshelf/types/types";
import useSearchBarParams from "../features/searchbar/hooks/useSearchBarParams";
import TagOptions from "../features/searchbar/components/TagOptions";
import { BookIcon, PlusIcon } from "../components/common/Icon";
import Button from "../components/form/Button";
import { useNavigate } from "react-router-dom";


export const BookShelfContext = createContext<BookShelfContextProps>(bookShelfContextInitialState)


export default function BookShelf() {

    const navigate = useNavigate()

    const {
        searchParams,
        setSearchParams,
        updateSearchParam,
        books,
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
                <BookList>
                    {books.map( book => (
                        <BookListItem book={book} key={book.id} />
                    ))}
                </BookList>


                { books.length === 0 && (
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
