import { useState } from "react"


type UseToggleState = [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void]

export default function useToggleState(initialValue: boolean = false) : UseToggleState {

    const [state, setState] = useState(initialValue)

    const toggleState = () => setState(prev => !prev)

    return [ state, setState, toggleState ]
}
