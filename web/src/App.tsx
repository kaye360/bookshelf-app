import { RouterProvider } from "react-router-dom"
import { router } from "./lib/Router/routes"
import { useSettings } from "./features/settings/api/getSettings"
import { useBooks } from "./features/bookshelf/api/getBooks"


/**
 * 
 * App initializtion goes here
 * 
 * Note:
 * Do not put this component directly in main.tsx as it causes an hmr bug
 * 
 */


export default function App() {

	useBooks()
	useSettings()

	return (
		<>
			<RouterProvider router={router} />	
		</>
	)
}