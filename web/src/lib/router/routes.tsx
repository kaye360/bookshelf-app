import { createBrowserRouter } from "react-router-dom";
import Error404 from "../../routes/error/Error404";
import Dashboard from "../../routes/dashboard/Dashboard";
import Index from "../../routes/Index";
import AuthRoute from "./AuthRoute";
import Book from "../../routes/book/Book";
import BookShelf from "../../routes/bookshelf/Books";
import Settings from "../../routes/settings/Settings";
import User from "../../routes/user/User";
import Community from "../../routes/community/Community";
import AddBook from "../../routes/add/AddBook";

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
		path: '/book',
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
		element : <User />
	},

	{
		path: '/community',
		element : <Community />
	},
])