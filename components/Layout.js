import { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { useStateValue } from '../state';
import { userLogout } from '../reducer/currentUser';

import { setLocalStorage } from '../utils';

export default function Layout({ children, appRendered }) {
    if (!appRendered) {
        return null;
    }

    const [{ currentUser }, dispatch] = useStateValue();

    const handleUserLogout = () => {
        dispatch(userLogout());
        setLocalStorage('currentUser', { isLoggedIn: false })
    }

    return (
        <Fragment>
            <p>{JSON.stringify(currentUser)}</p>
            <ul>
                <li>
                    <Link href="login"><a>Login</a></Link>
                </li>
                <li>
                    <Link href="register"><a>Register</a></Link>
                </li>
                <li>
                    <button
                        onClick={handleUserLogout}
                    >
                        Logout
                    </button>
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
