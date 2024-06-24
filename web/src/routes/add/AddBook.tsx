import BaseLayout from '../../layouts/BaseLayout'
import Form from '../../features/addBook/components/Form'
import Status from '../../features/addBook/components/Status'
import { useState } from 'react'
import useExternalBookSearchForm from '../../features/externalBookApi/hooks/useSearchExternalBookForm'
import useSearchExternalBookApi from '../../features/externalBookApi/hooks/useSearchExternalBookApi'
import usePaginateResults from '../../features/externalBookApi/hooks/usePaginateResults'
import Button from '../../components/form/Button'
import Result from '../../features/addBook/components/Result'


export default function AddBook() {

    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    const form   = useExternalBookSearchForm({setSearchQuery})
    const status = useSearchExternalBookApi({searchQuery})

    const formProps    = { setSearchQuery, ...form }
    const statusProps  = { searchQuery, ...status }

    const { bookList, hasMoreBooks, nextPage } = usePaginateResults({ data : status.data})

    return (
        <BaseLayout>

            <Form { ...formProps } />

            <Status { ...statusProps } />

            { statusProps.hasResults && (
                <div className='grid gap-16 w-full max-w-3xl'>

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
