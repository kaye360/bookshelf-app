import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../../app/home/views/Dashboard";
import Index from "../../app/home/views/Index";
import AuthRoute from "../../app/auth/components/AuthRoute";
import Book from "../../app/externalBookApi/views/Book";
import BookShelf from "../../app/bookshelf/views/Bookshelf";
import Settings from "../../app/settings/views/Settings";
import Community from "../../app/community/views/Community";
import AddBook from "../../app/externalBookApi/views/SearchBooks";
import Profile from "../../app/profile/views/Profile";
import Error from "../../app/error/Error";
import PasswordReset from "../../app/auth/views/PasswordReset";
import PasswordResetRequest from "../../app/auth/views/PasswordResetRequest";

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
		path : '/password-reset/:token',
		element : <PasswordReset />,
		errorElement
	},

	{
		path : '/password-reset-request/',
		element : <PasswordResetRequest />,
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