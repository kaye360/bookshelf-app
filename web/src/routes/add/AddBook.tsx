import BaseLayout from '../../layouts/BaseLayout'
import useAddBook from './useAddBook'
import Form from '../../components/addBook/Form'
import Status from '../../components/addBook/Status'
import Results from '../../components/addBook/Results'


export default function AddBook() {

    const { handleSubmit, onSubmit, register, setQuery, isFetching, isError, hasNoResults, hasResults, query, data } = useAddBook()

    return (
        <BaseLayout>

            <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                setQuery={setQuery}
             />

            <Status 
                isFetching={isFetching}
                isError={isError}
                hasNoResults={hasNoResults}
                hasResults={hasResults}
                query={query}
                data={data}
            />

            { hasResults && (
                <Results data={data} />
            )}

        </BaseLayout>
    )
}
