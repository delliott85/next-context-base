import { defaultState as userState, userReducer } from './currentUser';
import { defaultState as modalState, modalReducer } from './modal';

export const initialState = {
    ...userState,
    ...modalState
}

export const reducer = ({ currentUser, modal }, action) => ({
    currentUser: userReducer(currentUser, action),
    modal: modalReducer(modal, action)
});
