import { useStore } from "../../../store/store"
import BookCard from "../components/views/BookCard"
import BookCardList from "../components/views/BookCardList"
import BookGrid from "../components/views/BookGrid"
import BookGridItem from "../components/views/BookGridItem"
import BookTable from "../components/views/BookTable"
import { BookTableComponent } from "../components/views/BookTableComponents"
import { Book, UserSettings } from "../../../types/types"
import useBookshelfParams from "./useBookshelfParams"
import { isValidView } from "../services/isValidSetting"

type List = React.FC<{children : any}>
type Item = React.FC<{book : Book}>

interface RenderedComponents {
    list : List,
    item : Item
}

export default function useBookshelfView() {

    let BookList     : React.FC<{children : any}> = BookGrid
    let BookListItem : React.FC<{book : Book}> = BookGridItem
    let view         : UserSettings['view']

    const renderedComponents : { [key in UserSettings['view']] : RenderedComponents } = {
        grid : { list : BookGrid,     item : BookGridItem },
        card : { list : BookCardList, item : BookCard },
        list : { list : BookTable,    item : BookTableComponent.Row },
    }

    const { searchParams } = useBookshelfParams()
    const { settings }     = useStore()
    const viewAs           = searchParams.get('viewAs')

    if( isValidView(viewAs) ) {
        // If Search Param, use search param
        BookList     = renderedComponents[viewAs].list
        BookListItem = renderedComponents[viewAs].item
        view = viewAs

    } else if( isValidView(settings.view)) {
        // Else use user setting
        BookList     = renderedComponents[settings.view].list
        BookListItem = renderedComponents[settings.view].item
        view = settings.view

    } else {
        // Default to Grid
        BookList     = BookGrid
        BookListItem = BookGridItem
        view = 'grid'
    }

    return {
        BookList,
        BookListItem,
        view
    }
}