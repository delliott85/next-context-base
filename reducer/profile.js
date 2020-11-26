const UPDATE_PROFILE = 'updateProfile';

export default function profileReducer(state, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
        return {
            ...state,
            ...action.profile
        }

        default:
            return state;
    }
}

export function updateProfile(profile) {
    return {
        type: UPDATE_PROFILE,
        profile: profile
    }
}
