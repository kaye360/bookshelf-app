import TextInput from "../../../components/form/TextInput";
import { useStore } from "../../../store/store";

export default function PersonalSettings({
    touchForm
} : {
    touchForm : () => void
}) {

    const { settings } = useStore()

    return (
        <div className="grid gap-3">
            
            <h2 className="text-lg font-medium mb-3">
                Personal Settings
            </h2>

            <TextInput
                label="Name"
                name="name"
                defaultValue={settings?.name || ''}
                onChange={touchForm}
            />

            <TextInput
                label="Email Address"
                name="email"
                type="email"
                defaultValue={settings?.email || ''}
                onChange={touchForm}
            />

            <TextInput
                label="Location"
                name="location"
                defaultValue={settings?.location || ''}
                onChange={touchForm}
            />

        </div>
    )
}
