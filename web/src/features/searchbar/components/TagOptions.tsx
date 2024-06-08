import { useContext } from "react";
import OptionButton from "./OptionButton";
import { BookShelfContext } from "../../../routes/bookshelf/Bookshelf";
import { HashIcon } from "../../../components/common/Icon";
import { useAuth } from "../../auth/components/AuthProvider";
import { getTagsFromBookList } from "../../tags/services/getTagsFromBookList";

export default function TagOptions() {

    const { user } = useAuth()
    const { searchParams, updateSearchParam } = useContext(BookShelfContext)

    const tags = getTagsFromBookList(user?.books || []).slice(0,6)

    return (
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide text-primary-light">

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
