import { RouterProvider } from "react-router-dom"
import { router } from "./lib/Router/routes"
import { useSettings } from "./features/settings/api/getSettings"
import { useUserBooks } from "./features/bookshelf/api/getUserBooks"
import { useEffect } from "react"
import { useStore } from "./store/store"


/**
 * 
 * App initializtion goes here
 * 
 * Note:
 * Do not put this component directly in main.tsx as it causes an hmr bug
 * 
 */


export default function App() {

	const { auth : { token, user } } = useStore()

	const userBooks = useUserBooks()
	const settings  = useSettings()
	
	useEffect( () => {
		userBooks.mutate()
		settings.mutate()
	}, [token, user])

	return (
		<>
			<RouterProvider router={router} />	
		</>
	)
}