import { SearchIcon } from "../../../../components/common/Icon";

export default function SearchButton() {
    return (
        <button className="w-16 border border-primary-light/50 grid place-items-center">
            <SearchIcon size={36} />
        </button>
    )
}
