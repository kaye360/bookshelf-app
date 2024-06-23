import { useState } from "react";
import { EditIcon } from "../../../components/common/Icon";
import Button from "../../../components/form/Button";
import useCurrentlyReading from "../hooks/useCurrentlyReading";
import { CurrentlyReading } from "./CurrentlyReadingComponents";


interface CurrentlyReadingSettingsProps {
    touchForm : () => void
}


export default function CurrentlyReadingSettings({touchForm} : CurrentlyReadingSettingsProps) {

    const [ showEditForm, setShowEditForm ] = useState(false)
    const { book, bookId, setBookId }     = useCurrentlyReading()

    const selectorProps = { showEditForm, touchForm, bookId, setBookId }
    
    return (
        <div>

            <div className="flex items-center justify-between max-w-xl mb-2">
                <h2 className="text-lg font-medium">    
                    Currently Reading {book?.id}
                </h2>

                <Button 
                    type="button"
                    variant="ghost"
                    onClick={ () => setShowEditForm(prev => !prev) }
                >
                    Edit
                    <EditIcon />
                </Button>

            </div>

            { book && (
                <CurrentlyReading.Preview book={book} />
            )}

            <CurrentlyReading.Selector {...selectorProps} />

        </div>
    )
}
