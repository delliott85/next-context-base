import userReducer from './currentUser';
import modalReducer from './modal';

export const initialState = {
    currentUser: {
        isLoggedIn: false
    },
    modal: {}
}

export const reducer = ({ currentUser, modal }, action) => ({
    currentUser: userReducer(currentUser, action),
    modal: modalReducer(modal, action)
});
