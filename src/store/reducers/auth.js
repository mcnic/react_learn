import * as types from '../actions/actionTypes'

const initialState = {
    token: null
}

export default function authReducer(state = initialState, action) {
    // console.log('action.type', action.type);
    // console.log(action);
    switch (action.type) {
        case types.AUTH_SUCCESS:
            return { ...state, token: action.token }
        case types.AUTH_LOGOUT:
            return { ...state, token: null }
        case types.AUTH_LOGIN:
            return { ...state, token: action.token }
        default:
            return state
    }
}