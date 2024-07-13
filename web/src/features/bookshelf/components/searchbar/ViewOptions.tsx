import OptionButton from "./OptionButton";
import { useBookshelfParams } from "../../hooks/useBookShelfParamsContext";
import { GridIcon, ListIcon, CardIcon } from "../../../../components/common/Icon";

export default function ViewOptions() {

    const { searchParams, updateSearchParam } = useBookshelfParams()

    return (
        <div className="flex flex-wrap gap-3">

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'grid') }
                isActive={searchParams.get('viewAs') === 'grid'}
            >
                <GridIcon />
                Grid
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'list') }
                isActive={searchParams.get('viewAs') === 'list'}
            >
                <ListIcon />
                List
            </OptionButton>

            <OptionButton 
                onClick={ () => updateSearchParam('viewAs', 'card') }
                isActive={searchParams.get('viewAs') === 'card'}
            >
                <CardIcon />
                Card
            </OptionButton>

        </div>
    )
}
