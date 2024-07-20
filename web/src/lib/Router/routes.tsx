import { createBrowserRouter } from "react-router-dom";
import Error404 from "../../app/error/Error404";
import Dashboard from "../../app/dashboard/Dashboard";
import Index from "../../app/Index";
import AuthRoute from "../../app/auth/components/AuthRoute";
import Book from "../../app/book/Book";
import BookShelf from "../../app/bookshelf/Bookshelf";
import Settings from "../../app/settings/Settings";
import Community from "../../app/community/Community";
import AddBook from "../../app/bookshelf/_add/AddBook";
import Profile from "../../app/user/Profile";

export const router = createBrowserRouter([
	{
		path: '/',
		element : <Index />,
		errorElement : <Error404 />
	},

	{
		path: '/login',
		element : <Index />,
	},

	{
		path: '/register',
		element : <Index />,
	},
	
	{
		path: '/dashboard',
		element : <AuthRoute><Dashboard /></AuthRoute>,
	},

	{
		path: '/book/:id',
		element : <Book />
	},

	{
		path: '/bookshelf',
		element : <AuthRoute><BookShelf /></AuthRoute>
	},

	{
		path: '/add',
		element : <AuthRoute><AddBook /></AuthRoute>
	},

	{
		path: '/settings',
		element : <AuthRoute><Settings /></AuthRoute>
	},

	{
		path: '/user',
		element : <Profile />,
		children : [
			{
				path : '/user/:handle',
				element : <Profile />
			}
		]
	},

	{
		path: '/community',
		element : <Community />
	},
])