import useBookshelfParams from "../../hooks/useBookshelfParams"

export default function TagButton({
    tag
}: {
    tag: string
}) {

    const { updateSearchParam } = useBookshelfParams()

    return (
        <button
            onClick={() => updateSearchParam('taggedAs', tag)}
            className="text-left text-wrap"
        >
            #{tag}
        </button>
    )
}
