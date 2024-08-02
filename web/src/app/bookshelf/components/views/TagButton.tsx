import { useBookshelfContext } from "../../hooks/useBookShelfContext"

export default function TagButton({
    tag
}: {
    tag: string
}) {

    const { updateSearchParam } = useBookshelfContext()

    return (
        <button
            onClick={() => updateSearchParam('filterBy', tag)}
            className="text-left text-wrap"
        >
            #{tag}
        </button>
    )
}
