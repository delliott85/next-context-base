import userReducer from './currentUser';
import modalReducer from './modal';
import profileReducer from './profile';

export const initialState = {
    currentUser: {
        isLoggedIn: false
    },
    modal: {},
    profile: {}
}

export const reducer = ({ currentUser, modal, profile }, action) => ({
    currentUser: userReducer(currentUser, action),
    modal: modalReducer(modal, action),
    profile: profileReducer(profile, action)
});
