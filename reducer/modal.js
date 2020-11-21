const SHOW_MODAL = 'showModal';
const HIDE_MODAL = 'hideModal';

export default function modalReducer(state, action) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                isOpen: true,
                type: action.modal
            }

        case HIDE_MODAL:
            return {
                isOpen: false,
                type: null
            }

        default:
            return state;
    }
}


export function showModal(modal) {
    return {
        type: SHOW_MODAL,
        modal: modal
    }
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}
