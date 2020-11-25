import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useStateValue } from './state';
import { userLogin } from './reducer/currentUser';

import { setLocalStorage } from './utils';

import Layout from './components/Layout';

export default function AppContainer({ children }) {
    const [{}, dispatch] = useStateValue();
    const [appRendered, setAppRender] = useState(false);

    useEffect(() => {
        const localUser = localStorage.getItem('currentUser');
        if (localUser) {
            return new Promise((resolve, reject) => {
                resolve(dispatch(userLogin(JSON.parse(localUser))))
            }).then(() => {
                setAppRender(true);
            });
        }
        return new Promise((resolve, reject) => {
            resolve(dispatch(userLogin({ isLoggedIn: false })))
        }).then(() => {
            setLocalStorage('currentUser', { isLoggedIn: false });
            setAppRender(true);
        });
    }, []);

    return (
        <div id="app-root">
            <Layout
                appRendered={appRendered}
            >
                {children}
            </Layout>
        </div>
    );
}

AppContainer.propTypes = {
    children: PropTypes.object
};
