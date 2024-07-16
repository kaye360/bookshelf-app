import OptionButton from "./OptionButton";
import { HashIcon } from "../../../../components/common/Icon";
import { getTagsFromBookList } from "../../../tags/services/getTagsFromBookList";
import { useBookshelfParams } from "../../hooks/useBookShelfParamsContext";
import { useStore } from "../../../../store/store";



export default function TagOptions() {

    const { books } = useStore()
    const { searchParams, updateSearchParam } = useBookshelfParams()

    const tags = getTagsFromBookList(books).slice(0,15)

    return (
        <div className={`
            flex items-center gap-3 flex-wrap
            ${ searchParams.get('searchQuery') ? 'opacity-40' : ''} 
        `}>

            { tags.map( tag => (
                <OptionButton
                    key={tag.tag}
                    onClick={ () => updateSearchParam('filterBy', tag.tag)}
                    isActive={searchParams.get('filterBy') === tag.tag}
                >
                    <HashIcon size={18} />
                    {tag.tag}
                </OptionButton>
            ))}

        </div>
    )
}