import { createContext } from "react"
import { SetURLSearchParams } from "react-router-dom"
import { BookshelfParams } from "../../../types/types"



export const bookShelfContextInitialState : {
    searchParams : any, 
    setSearchParams : SetURLSearchParams
    updateSearchParam : <K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) => void
} = {
    searchParams : {},
    setSearchParams :  () => {},
    updateSearchParam : () => {}
}


export const BookShelfContext = createContext<typeof bookShelfContextInitialState>(bookShelfContextInitialState)
