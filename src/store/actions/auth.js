import axios from 'axios'
import * as types from '../actions/actionTypes'

export default function auth(email, password, isLogin) {
    return async dispatch => {
        try {
            const authData = {
                email,
                password,
                returnSecureToken: true
            }
            let method = isLogin
                ? 'accounts:signInWithPassword'
                : 'accounts:signUp'
            const apiUrl = `https://identitytoolkit.googleapis.com/v1/${method}?key=AIzaSyCsacmGEn3dPQzx5yjHYfXQKdWGt-_P5P8`
            const response = await axios.post(apiUrl, authData)

            const data = response.data
            const expirationDate = new Date(new Date().getTime() + parseInt(data.expiresIn) * 1000)
            console.log(new Date())
            console.log(expirationDate)
            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expirationDate', expirationDate)

            dispatch(authSuccess(data.idToken))
            dispatch(autoLogout(data.expiresIn))
        } catch (error) {
            console.log(error);
        }
    }
}

export function authSuccess(token) {
    return {
        type: types.AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            console.log('token expired, logout')
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: types.AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                // const expiresIn = expirationDate - new Date()
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
                dispatch(autoLogout(expiresIn))
            }
        }
    }
}
