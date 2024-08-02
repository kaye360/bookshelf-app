import TagButton from "./TagButton"

export default function TagList({
    tags
} : {
    tags : string[]
}) {
    return (
        <div className="flex flex-wrap items-center gap-x-2 text-xs overflow-hidden">
            { tags.map( (tag, i) => (
                <TagButton tag={tag} key={i} />
            ))}
        </div>
    )
}
