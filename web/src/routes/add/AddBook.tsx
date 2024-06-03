import BaseLayout from '../../layouts/BaseLayout'
import useAddBook from './useAddBook'
import Form from '../../components/addBook/Form'
import Status from '../../components/addBook/Status'
import ResultList from '../../components/addBook/ResultList'


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
