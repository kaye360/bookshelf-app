import { createBrowserRouter } from "react-router-dom";
import Error404 from "../../routes/error/Error404";
import Dashboard from "../../routes/Dashboard";
import Index from "../../routes/Index";
import AuthRoute from "../../features/auth/components/AuthRoute";
import Book from "../../routes/Book";
import BookShelf from "../../routes/Bookshelf";
import Settings from "../../routes/Settings";
import Community from "../../routes/Community";
import AddBook from "../../routes/AddBook";
import Profile from "../../routes/Profile";

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
		element : <Profile />
	},

	{
		path: '/community',
		element : <Community />
	},
])