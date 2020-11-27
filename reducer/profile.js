const UPDATE_PROFILE = 'updateProfile';
const CLEAR_PROFILE = 'clearProfile';

export default function profileReducer(state, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                ...action.profile
            }

        case CLEAR_PROFILE:
            return {}

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

export function clearProfile() {
    return {
        type: CLEAR_PROFILE
    }
}
