import { LoaderIcon } from "../../../components/common/Icon"
import { useStore } from "../../../store/store"

export default function Loader() {

    const { booksStatus } = useStore()

    if( booksStatus === 'LOADING') {
        return (
            <div className="flex items-center gap-3 text-xl font-medium my-8">
                <LoaderIcon size={32} />
                Loading your bookshelf...
            </div>
        )
    }

    return null
}
