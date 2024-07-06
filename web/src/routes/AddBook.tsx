import BaseLayout from '../layouts/BaseLayout'
import { SyntheticEvent, useState } from 'react'
import usePaginateResults from '../features/externalBookApi/hooks/usePaginateResults'
import Button from '../components/form/Button'
import Result from '../features/addBook/components/Result'
import useGetApiBooks from '../features/externalBookApi/api/getApiBooks'
import TextInput from '../components/form/TextInput'
import { LoaderIcon } from '../components/common/Icon'
import { useQueryClient } from '@tanstack/react-query'



export default function AddBook() {

    const client = useQueryClient()

    const [hasSearched, setHasSearched] = useState<boolean>(false)

    const { search, data, isError, isFetching, hasResults } = useGetApiBooks()

    const { bookList, hasMoreBooks, nextPage } = usePaginateResults({ data })

    const searchQueryEl = document.querySelector('#search-query-input') as HTMLInputElement
    const searchQuery = searchQueryEl ? searchQueryEl.value : ''
    
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setHasSearched(true)
        search()
    }

    function handleReset() {
        setHasSearched(false)
        client.setQueryData(['searchGoogleBooks'], null)
    }

    return (
        <BaseLayout>

            <form 
                id="search-external-book-api-form"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >

                <TextInput
                    label='Find your books'
                    name="query"
                    id="search-query-input"
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
                { isFetching && (
                    <div className='flex items-center gap-2'>
                        <LoaderIcon />
                        Searching
                    </div>
                )}
                { isError && (
                    <>
                        Something went wrong, please try again.
                    </>
                )}
                { !hasResults && hasSearched && !isFetching && (
                    <>
                        No results were found. Please try another search
                    </>
                )}
                { hasResults && (
                    <>
                        Search results for:  
                        <span className='font-bold'>{searchQuery}</span> <br />
                        ({data?.totalItems} results)
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
