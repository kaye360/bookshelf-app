import { API_URL } from '../../../config';
import { Req } from '../../../utils/req';
import { LoginDispatch, LoginPayload, RegisterDispatch, RegisterPayload } from '../types/types';


export async function login(dispatch : LoginDispatch, loginPayload: LoginPayload) {

    if(!dispatch) return

    try {
        dispatch({ type: 'REQUEST_LOGIN' });

        const response = await Req.send({
            url : `${API_URL}/login`,
            method : 'POST',
            payload : loginPayload
        })
        
        if( response.data.user?.id && response.data.access_token ) {

            localStorage.setItem('currentUser', JSON.stringify(response.data)); 
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            return response.data
        }

        dispatch({ type: 'LOGIN_ERROR', error: 'LOGIN' });

    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: 'LOGIN' });
    }
}


export async function logout(dispatch : LoginDispatch) {
    dispatch && dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}


export async function register(dispatch : RegisterDispatch, registerPayload: RegisterPayload) {

    if( !dispatch) return

    try {
        dispatch({ type: 'REQUEST_REGISTER' });

        const response = await Req.send({
            url     : `${API_URL}/register`,
            method  : 'POST',
            payload : registerPayload
        })

        if ( response.data.access_token ) {
            dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            return response.data
        }

        dispatch({ type: 'REGISTER_ERROR', error: 'REGISTER' });
        
    } catch (error) {
        dispatch({ type: 'REGISTER_ERROR', error: 'REGISTER' });
    }
}