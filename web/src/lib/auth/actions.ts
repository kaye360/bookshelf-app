import { LoginDispatch, LoginPayload, RegisterDispatch, RegisterPayload } from './types';
const API_URL = 'http://192.168.1.70:8000/api';

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
        let data = await response.json();
        
        if (data.access_token) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.message });
        return
    } catch (error) {
        if( typeof error === 'string') {
            dispatch && dispatch({ type: 'LOGIN_ERROR', error: error });
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

        dispatch({ type: 'REGISTER_ERROR', error: data.message });
        return
    } catch (error) {
        if( typeof error === 'string') {
            dispatch && dispatch({ type: 'REGISTER_ERROR', error: error });
        }
    }
}