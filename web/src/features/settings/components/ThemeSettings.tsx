import { MoonIcon, SunIcon } from "../../../components/common/Icon";
import { useAuth } from "../../auth/hooks/useAuth";

export default function ThemeSettings({
    touchForm
} : {
    touchForm : () => void
}) {

    const { user } = useAuth()
    const isLightTheme = user?.settings?.theme === 'light'

    return (
        <div>
            <h2 className="text-lg font-medium mb-3">
                Theme
            </h2>

            <div className="flex items-center gap-2 font-semibold">

                <label className="flex items-center gap-1 w-fit p-3 rounded has-[:checked]:text-accent border border-transparent has-[:checked]:border-accent cursor-pointer transition-colors">

                    <input 
                        type="radio" 
                        name="theme" 
                        value="light" 
                        onChange={touchForm}
                        className="absolute -left-2 opacity-0" 
                        defaultChecked={isLightTheme}
                    />
                    <SunIcon />
                    Light Mode

                </label>

                <label className="flex items-center gap-1 w-fit p-3 rounded has-[:checked]:text-accent border border-transparent has-[:checked]:border-accent cursor-pointer transition-colors">

                    <input 
                        type="radio" 
                        name="theme" 
                        value="dark" 
                        onChange={touchForm}
                        className="absolute -left-2 opacity-0" 
                        defaultChecked={!isLightTheme}
                    />
                    <MoonIcon />
                    Dark Mode

                </label>
            </div>
        </div>
    )
}
