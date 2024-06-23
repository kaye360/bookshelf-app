import TextInput from "../../../components/form/TextInput";
import { useAuth } from "../../auth/hooks/useAuth";

export default function PersonalSettings() {

    const {user} = useAuth()

    return (
        <div className="grid gap-3">
            
            <h2 className="text-lg font-medium mb-3">
                Personal Settings
            </h2>

            <TextInput
                label="Name"
                name="name"
                defaultValue={user?.settings?.name || ''}
            />

            <TextInput
                label="Email Address"
                name="email"
                type="email"
                defaultValue={user?.settings?.email || ''}
            />

            <TextInput
                label="Location"
                name="location"
                defaultValue={user?.settings?.location || ''}
            />

        </div>
    )
}
