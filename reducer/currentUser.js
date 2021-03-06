const USER_LOGIN = 'userLogin';
const USER_LOGOUT = 'userLogout';

export default function userReducer(state, action) {
    switch (action.type) {
        case USER_LOGIN:
        return {
            ...state,
            ...action.user
        }
        case USER_LOGOUT:
            return {
                isLoggedIn: false
            }

        default:
            return state;
    }
}

export function userLogin(user) {
    return {
        type: USER_LOGIN,
        user: user
    }
}

export function userLogout() {
    return {
        type: USER_LOGOUT
    }
}
