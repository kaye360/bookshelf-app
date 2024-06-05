import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { GoogleBookResponse } from "../../features/book/types/types"

export interface SearchInput {
    query : string
}

export interface UseAddBook {
    formProps : {
        handleSubmit : UseFormHandleSubmit<SearchInput, undefined>
        onSubmit     : SubmitHandler<SearchInput>
        register     : UseFormRegister<SearchInput>
        setQuery     : React.Dispatch<React.SetStateAction<string | null>>,
    }
    statusProps : {
        isFetching   : boolean,
        isError      : boolean,
        hasNoResults : boolean,
        hasResults   : boolean,
        query        : string | null,
        data         : GoogleBookResponse | null
    }
    resultsProps : {
        data         : GoogleBookResponse | null
    }
}