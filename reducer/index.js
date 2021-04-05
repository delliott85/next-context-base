import { defaultState as currentUserState, currentUserReducer } from './currentUser';

export const initialState = {
    ...currentUserState
}

export const reducer = ({ currentUser }, action) => ({
    currentUser: currentUserReducer(currentUser, action)
});
