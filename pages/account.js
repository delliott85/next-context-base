import { useState } from 'react';
import { useRouter } from 'next/router';
import firebase, { updateFirestore, removeFromFirestore } from '../api';

import { useStateValue } from '../state';
import { userLogin, userLogout } from '../reducer/currentUser';
import { showModal } from '../reducer/modal';

import { MODAL_TYPE_REAUTH } from '../constants/modal';
import { validator, setLocalStorage } from '../utils';

import AccountSettings from '../components/account/AccountSettings';
import ReauthModal from '../components/modal/ReauthModal';

export default function Account() {
    const [queuedFunction, setqueuedFunction] = useState(null);
    const [validationError, setValidationError] = useState(null);

    const [{ currentUser }, dispatch] = useStateValue();
    const router = useRouter();

    const formSubmitActions = (type, form) => {
        setqueuedFunction({
            type,
            form
        });
        showReauthModal();
    }

    const updateEmail = (form) => {
        const user = firebase.auth().currentUser;

        const newVal = form.new.value;

        const updatedUser = {
            ...currentUser,
            email: newVal,
            email_verified: false
        }

        user.updateEmail(newVal).then(() => {
            updateFirestore('users', user.uid, { 'email': newVal, email_verified: false });
            setLocalStorage('currentUser', updatedUser);
            dispatch(userLogin(updatedUser));
            console.log(`Your new email address is ${newVal}`);
        }).catch((err) => {
            console.warn('There was an error updating your email address', err);
        })
    }

    const updatePassword = (form) => {
        const user = firebase.auth().currentUser;

        const newVal = form.new.value;

        user.updatePassword(newVal).then(() => {
            console.log('Your password has been updated');
            return;
        }).catch((err) => {
            console.log('There was an error updating your password', err);
        })
    }

    const deleteUser = () => {
        const user = firebase.auth().currentUser;

        user.delete().then(() => {
            setLocalStorage('currentUser', { isLoggedIn: false })
            removeFromFirestore('users', currentUser.user_id);
            removeFromFirestore('profiles', currentUser.username);
        }).then(() => {
            router.push('/');
            dispatch(userLogout());
        }).catch((err) => {
            console.log('There was an error deleting the user', err);
        })
    }

    const handleReauth = () => {
        const { type, form } = queuedFunction;

        switch (type) {
            case 'email-change':
                updateEmail(form);
                break;

            case 'password-change':
                updatePassword(form);
                break;

            case 'delete-account':
                deleteUser();
                break;

            default:
                break;
        }
    }

    const showReauthModal = () => {
        dispatch(
            showModal(MODAL_TYPE_REAUTH)
        );
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const type = form.getAttribute('data-type');

        if (type === 'delete-account') {
            formSubmitActions(type);
            return;
        }

        const newVal = form.new.value;
        const confirmVal = form.confirm.value;

        setValidationError(null);

        if (validator(newVal, confirmVal)) {
            formSubmitActions(type, form);
            return;
        }

        setValidationError(type);
        return;
    }

    return (
        <div>
            <h1>My Account</h1>
            <AccountSettings
                onFormSubmit={handleFormSubmit}
            />
            <ReauthModal
                onReauth={handleReauth}
            />
        </div>
    );
}
