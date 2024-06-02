import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"
import { GoogleBookResponse } from "../../lib/book/types"

export interface SearchInput {
    query : string
}

export interface UseAddBook {
    handleSubmit : UseFormHandleSubmit<SearchInput, undefined>
    onSubmit     : SubmitHandler<SearchInput>
    register     : UseFormRegister<SearchInput>
    setQuery     : React.Dispatch<React.SetStateAction<string | null>>,
    isFetching   : boolean,
    isError      : boolean,
    hasNoResults : boolean,
    hasResults   : boolean,
    query        : string | null,
    data         : GoogleBookResponse | null
}