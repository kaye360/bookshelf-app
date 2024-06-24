import { useForm, SubmitHandler } from "react-hook-form"
import { Dispatch } from "react"
import { SearchInput } from "../../addBook/components/Form"


export default function useExternalBookSearchForm({
    setSearchQuery
} : {
    setSearchQuery : Dispatch<React.SetStateAction<string | null>>
}) {

    const { register, handleSubmit } = useForm<SearchInput>()

    const onSubmit: SubmitHandler<SearchInput> = async (data) => {
        setSearchQuery(data.query)
    }
    
    return {
        handleSubmit, onSubmit, register
    }
}
