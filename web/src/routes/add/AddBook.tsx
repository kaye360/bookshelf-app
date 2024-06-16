import BaseLayout from '../../layouts/BaseLayout'
import Form from '../../features/addBook/components/Form'
import Status from '../../features/addBook/components/Status'
import ResultList from '../../features/addBook/components/ResultList'
import { useState } from 'react'
import useExternalBookSearchForm from '../../features/externalBookApi/hooks/useSearchExternalBookForm'
import useSearchExternalBookApi from '../../features/externalBookApi/hooks/useSearchExternalBookApi'
import usePaginateResults from '../../features/externalBookApi/hooks/usePaginateResults'


export default function AddBook() {

    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    const form   = useExternalBookSearchForm({setSearchQuery})
    const status = useSearchExternalBookApi({searchQuery})

    const formProps    = { setSearchQuery, ...form }
    const statusProps  = { searchQuery, ...status }
    const resultsProps = usePaginateResults({ data : status.data})

    return (
        <BaseLayout>

            <Form { ...formProps } />

            <Status { ...statusProps } />

            { statusProps.hasResults && (
                <ResultList { ...resultsProps } />
            )}

        </BaseLayout>
    )
}
