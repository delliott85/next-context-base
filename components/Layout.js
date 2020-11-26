import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import firebase from '../api';

import { useStateValue } from '../state';
import { userLogin, userLogout } from '../reducer/currentUser';

import { setLocalStorage } from '../utils';

export default function Layout({ children, appRendered }) {
    if (!appRendered) {
        return null;
    }

    const [{ currentUser, profile }, dispatch] = useStateValue();

    // If we've been redirected via email verification
    // Check firebase user and set value accordingly
    firebase.auth().onAuthStateChanged((user) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has('emailVerified')) {
            dispatch(userLogin({
                ...currentUser,
                email_verified: user.emailVerified
            }))
            setLocalStorage(
                'currentUser',
                {
                    ...currentUser,
                    email_verified: user.emailVerified
                }
            );
        }
    });

    const handleUserLogout = () => {
        dispatch(userLogout());
        setLocalStorage('currentUser', { isLoggedIn: false })
    }

    return (
        <Fragment>
            <p>{JSON.stringify(currentUser)}</p>
            <p>{JSON.stringify(profile)}</p>
            <ul>
                <li>
                    <Link href="/login"><a>Login</a></Link>
                </li>
                <li>
                    <Link href="/register"><a>Register</a></Link>
                </li>
                <li>
                    <button
                        onClick={handleUserLogout}
                    >
                        Logout
                    </button>
                </li>
                <li>
                    <Link href="/account"><a>My Account</a></Link>
                </li>
                <li>
                    <Link href="/profile"><a>Profile</a></Link>
                </li>
            </ul>
            {children}
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.object,
    appRendered: PropTypes.bool
};
