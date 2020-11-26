import PropTypes from 'prop-types';
import firebase from '../../api';

import { useStateValue } from '../../state';
import { hideModal } from '../../reducer/modal';

import { MODAL_TYPE_REAUTH } from '../../constants/modal';

import Modal from './Modal';

export default function ReauthModal({ onReauth }) {
    const [{ modal }, dispatch] = useStateValue();

    const handleReauthSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const pwrd = form.password.value;
        const user = firebase.auth().currentUser;

        const credential = firebase.auth.EmailAuthProvider.credential(user.email, pwrd);

        user.reauthenticateWithCredential(credential).then(() => {
            onReauth();
            dispatch(hideModal());
        }).catch((err) => {
            console.log('Bastard', err);
        })
    }

    return (
        <Modal
            modal={MODAL_TYPE_REAUTH}
            isActive={modal.type === MODAL_TYPE_REAUTH}
        >
            <form
                onSubmit={handleReauthSubmit}
            >
                <div style={{ marginBottom: 10 }}>
                    <label htmlFor="password">Confirm account password</label>
                    <input type="password" name="password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
}
