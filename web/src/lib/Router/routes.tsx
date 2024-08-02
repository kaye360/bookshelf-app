import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../app/dashboard/Dashboard";
import Index from "../../app/Index";
import AuthRoute from "../../app/auth/components/AuthRoute";
import Book from "../../app/book/Book";
import BookShelf from "../../app/bookshelf/Bookshelf";
import Settings from "../../app/settings/Settings";
import Community from "../../app/community/Community";
import AddBook from "../../app/bookshelf/_add/AddBook";
import Profile from "../../app/profile/Profile";
import Error from "../../app/error/Error";

const errorElement = <Error />

export const router = createBrowserRouter([
	{
		path: '/',
		element : <Index />,
		errorElement,
	},

	{
		path: '/login',
		element : <Index />,
		errorElement
	},

	{
		path: '/register',
		element : <Index />,
		errorElement
	},
	
	{
		path: '/dashboard',
		element : <AuthRoute><Dashboard /></AuthRoute>,
		errorElement
	},

	{
		path: '/book/:id',
		element : <Book />,
		errorElement
	},

	{
		path: '/bookshelf',
		element : <AuthRoute><BookShelf /></AuthRoute>,
		errorElement
	},

	{
		path: '/add',
		element : <AuthRoute><AddBook /></AuthRoute>,
		errorElement
	},

	{
		path: '/settings',
		element : <AuthRoute><Settings /></AuthRoute>,
		errorElement
	},

	{
		path: '/user',
		element : <Profile />,
		errorElement,
		children : [
			{
				path : '/user/:handle',
				element : <Profile />
			}
		]
	},
	
	{
		path: '/community',
		element : <Community />,
		errorElement
	},
])