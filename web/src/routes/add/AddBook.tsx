import BaseLayout from '../../layouts/BaseLayout'
import useAddBook from './useAddBook'
import Form from '../../features/addBook/components/Form'
import Status from '../../features/addBook/components/Status'
import ResultList from '../../features/addBook/components/ResultList'


export default function AddBook() {

    const { formProps, statusProps, resultsProps} = useAddBook()

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
