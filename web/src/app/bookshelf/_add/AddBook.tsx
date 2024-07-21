import BaseLayout from '../../../layouts/BaseLayout'
import Button from '../../../components/form/Button'
import Result from './components/Result'
import TextInput from '../../../components/form/TextInput'
import { LoaderIcon } from '../../../components/common/Icon'
import useFormHandlers from './hooks/useFormHandlers'


export default function AddBook() {
    
    const {
        handleReset,
        handleSubmit,
        query,
        hasResults,
        hasSearched,
        hasMoreBooks,
        nextPage,
        bookList,
        searchQueryParam
    } = useFormHandlers()

    return (
        <BaseLayout>

            <form 
                id="search-external-book-api-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >

                <TextInput
                    label='Find your books'
                    name="q"
                    type='search'
                    placeholder='Enter an author, book title, category, or isbn'
                    autoComplete="off"
                />

                <div className='flex items-center gap-4 mt-4'>

                    <Button>
                        Search
                    </Button>
                    
                    <Button 
                        variant='ghost'
                        type='reset'
                    >
                        Reset
                    </Button>

                </div>

            </form>


            <div 
                id="search-status"
                className='text-xl my-6'
            >
                { query.isPending && (
                    <div className='flex items-center gap-2'>
                        <LoaderIcon />
                        Searching
                    </div>
                )}
                { query.isError && (
                    <>
                        Something went wrong, please try again.
                    </>
                )}
                { !hasResults && hasSearched && !query.isPending && (
                    <>
                        No results were found. Please try another search
                    </>
                )}
                { hasResults && (
                    <>
                        Search results for:  
                        <span className='font-bold'> {searchQueryParam}</span>
                        <span className='text-sm'> ({query.data?.length} results) </span>
                    </>
                )}
            </div>


            { hasResults && (
                <div 
                    id="search-results"
                    className='grid gap-16 w-full max-w-3xl'
                >

                    { bookList.map( (book, i) => (
                        <Result book={book} key={i} />
                    ))}
        
                    { hasMoreBooks && (
                        <Button variant="ghost" onClick={ nextPage }>
                            Load More Results
                        </Button>
                    )}
        
                </div>
            )}


        </BaseLayout>
    )
}
