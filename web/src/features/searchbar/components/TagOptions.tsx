import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../../routes/Bookshelf";
import { HashIcon } from "../../../components/common/Icon";
import { getTagsFromBookList } from "../../tags/services/getTagsFromBookList";
import { useStore } from "../../../store/store";


export default function TagOptions() {

    const { auth : { user } } = useStore()
    const { searchParams, updateSearchParam } = useContext(BookShelfContext)

    const tags = getTagsFromBookList(user?.books || []).slice(0,8)

    return (
        <div className={`
            flex items-center gap-3 overflow-x-auto scrollbar-hide text-primary-dark 
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
