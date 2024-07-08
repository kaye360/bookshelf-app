import { createContext, useContext } from "react"
import { BookshelfParams } from "../../../types/types"


export function useBookshelfParams() { 
    return useContext(BookShelfContext)
}


const bookShelfContextInitialState : {
    searchParams : any, 
    updateSearchParam : <K extends keyof BookshelfParams>(param : K, value: BookshelfParams[K]) => void
} = {
    searchParams : {},
    updateSearchParam : () => {}
}


export const BookShelfContext = createContext<typeof bookShelfContextInitialState>(bookShelfContextInitialState)