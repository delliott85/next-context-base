const SET_LOADING = 'setLoading';

export const defaultState = {
    global: {
        loading: true
    }
}

export function globalReducer(state, action) {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.value
            }

        default:
            return state;
    }
}


export function setLoading(isLoading) {
    return {
        type: SET_LOADING,
        value: isLoading
    }
}
