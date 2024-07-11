import BaseLayout from '../layouts/BaseLayout'
import { SyntheticEvent, useState } from 'react'
import usePaginateResults from '../features/externalBookApi/hooks/usePaginateResults'
import Button from '../components/form/Button'
import Result from '../features/bookshelf/components/Result'
import TextInput from '../components/form/TextInput'
import { LoaderIcon } from '../components/common/Icon'
import { useQueryClient } from '@tanstack/react-query'
import useExternalApiBooks from '../features/externalBookApi/api/getExternalApiBooks'


export default function AddBook() {

    const client = useQueryClient()

    const [hasSearched, setHasSearched] = useState<boolean>(false)

    const query = useExternalApiBooks()

    const hasResults = query.isSuccess && !query.isPending && query.data?.totalItems !== 0

    const { bookList, hasMoreBooks, nextPage } = usePaginateResults({ data : query.data })

    const searchQueryEl = document.querySelector('#search-query-input') as HTMLInputElement
    const searchQuery = searchQueryEl ? searchQueryEl.value : ''
    
    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setHasSearched(true)
        query.mutate()
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
                        <span className='font-bold'>{searchQuery}</span> <br />
                        ({query.data?.totalItems} results)
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
