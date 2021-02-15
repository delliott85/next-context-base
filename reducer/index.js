import { defaultState as globalState, globalReducer } from './global';
import { defaultState as userState, userReducer } from './currentUser';
import { defaultState as modalState, modalReducer } from './modal';

export const initialState = {
    ...globalState,
    ...userState,
    ...modalState
}

export const reducer = ({ global, currentUser, modal }, action) => ({
    global: globalReducer(global, action),
    currentUser: userReducer(currentUser, action),
    modal: modalReducer(modal, action),
    profile: profileReducer(profile, action)
});
