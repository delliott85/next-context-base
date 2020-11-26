import PropTypes from 'prop-types';

import { useStateValue } from '../../state';
import { hideModal } from '../../reducer/modal';

export default function Modal({ children, isActive }) {
    if (!children) {
        return null;
    }

    const [{}, dispatch] = useStateValue();

    const handleCloseModalClick = () => {
        dispatch(hideModal());
    }

    const style = {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
        display: 'none'
    }

    if (isActive) {
        style.display = 'block'
    }

    return (
        <div style={style}>
            <button onClick={handleCloseModalClick}>Close</button>
            <div>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    children: PropTypes.object
};
