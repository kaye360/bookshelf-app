import BaseLayout from '../../../layouts/BaseLayout'
import Button from '../../../components/form/Button'
import Result from '../components/Result'
import TextInput from '../../../components/form/TextInput'
import { LoaderIcon } from '../../../components/common/Icon'
import { useSearchParams } from 'react-router-dom'
import useExternalApiBooks from '../api/getExternalApiBooks'
import { useEffect } from 'react'
import useSearchForm from '../hooks/useSearchForm'

export default function SearchBooks() {

    const [searchParams, setSearchParams] = useSearchParams()
    const searchQueryParam = searchParams.get('q')

    const query = useExternalApiBooks(searchQueryParam)
    useEffect( () => {  
        query.mutate()
    }, [searchQueryParam])
    
    const {
        handleReset,
        handleSubmit,
        hasResults,
        hasSearched,
        hasMoreBooks,
        nextPage,
        bookList,
    } = useSearchForm({query, setSearchParams})

    return (
        <BaseLayout title="Search Books">

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
                    defaultValue={searchQueryParam || ''}
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
                        <span className='font-bold'> {searchQueryParam}</span><br />
                        <span className='text-sm'> ({query.data?.length} results from OpenLibrary.org)</span>
                    </>
                )}
            </div>


            { hasResults && (
                <div 
                    id="search-results"
                    className='grid gap-12 w-full max-w-3xl'
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
