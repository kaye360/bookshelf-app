import { API_URL } from '../../../config';
import { LoginDispatch, LoginPayload, RegisterDispatch, RegisterPayload } from '../types/types';
import { getUserBooks } from './getUsersBooks';


export async function login(dispatch : LoginDispatch, loginPayload: LoginPayload) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(loginPayload)
    }

    try {
        if( !dispatch) return
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${API_URL}/login`, requestOptions);
        let data     = await response.json();

        if( data.user?.id && data.access_token ) {

            localStorage.setItem('currentUser', JSON.stringify(data)); // Dont store book data in localstorage
            data.user.books = await getUserBooks(data.user.id)
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: 'LOGIN' });
        return
    } catch (error) {
        if( typeof error === 'string') {
            dispatch && dispatch({ type: 'LOGIN_ERROR', error: 'LOGIN' });
        }
    }
}


export async function logout(dispatch : LoginDispatch) {
    dispatch && dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}


export async function register(dispatch : RegisterDispatch, registerPayload: RegisterPayload) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(registerPayload)
    }

    try {
        if( !dispatch) return
        dispatch({ type: 'REQUEST_REGISTER' });
        let response = await fetch(`${API_URL}/register`, requestOptions);
        let data = await response.json();

        if (data.access_token) {
            dispatch({ type: 'REGISTER_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'REGISTER_ERROR', error: 'REGISTER' });
        return
    } catch (error) {
        dispatch && dispatch({ type: 'REGISTER_ERROR', error: 'REGISTER' });
    }
}