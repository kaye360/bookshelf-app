import { ChevronDownIcon } from "../../../../components/common/Icon"
import { useBookshelfContext } from "../../hooks/useBookShelfContext"
import { BookTableComponent } from "./BookTableComponents"

export default function BookTable({
    children
}: {
    children?: any
}) {

    const { searchParams, updateSearchParam } = useBookshelfContext()

    return (
        <div className="max-w-[100vw] overflow-x-auto">
            <table className="w-full">

                <thead>
                    <tr className="font-semibold">
                        <BookTableComponent.Cell>
                            Cover
                        </BookTableComponent.Cell>
                        <BookTableComponent.Cell>
                            <button 
                                onClick={ () => updateSearchParam('sortBy', 'title')}
                                className="hover:underline flex items-center gap-1"
                            >
                                Title
                                { searchParams.get('sortBy') === 'title' && (
                                    <ChevronDownIcon />
                                )}
                            </button>
                        </BookTableComponent.Cell>
                        <BookTableComponent.Cell>
                            <button 
                                onClick={ () => updateSearchParam('sortBy', 'authors')}
                                className="hover:underline flex items-center gap-1"
                            >
                                Authors
                                { searchParams.get('sortBy') === 'authors' && (
                                    <ChevronDownIcon />
                                )}
                            </button>
                        </BookTableComponent.Cell>
                        <BookTableComponent.Cell>
                            Tags
                        </BookTableComponent.Cell>
                        <BookTableComponent.Cell>
                            Actions
                        </BookTableComponent.Cell>
                    </tr>
                </thead>

                <tbody>
                    {children}
                </tbody>

            </table>
        </div>
    )
}
