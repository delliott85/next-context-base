import { Fragment } from 'react';
import PropTypes from 'prop-types';

import { useStateValue } from '../state';

export default function Layout({ children, appRendered }) {
    if (!appRendered) {
        return null;
    }

    const [{ currentUser }] = useStateValue();

    return (
        <Fragment>
            <p>{JSON.stringify(currentUser)}</p>
            {children}
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.object,
    appRendered: PropTypes.bool
};
