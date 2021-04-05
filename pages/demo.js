import { useStateValue } from '../state';

import { userLogin, userLogout } from '../reducer/currentUser';

export default function Demo() {
    const [{ currentUser }, dispatch] = useStateValue();

    const onButtonClick = () => {
        if (currentUser.isLoggedIn) {
            return dispatch(userLogout());
        }

        const demoUser = {
            name: 'Herman Munster'
        };

        return dispatch(userLogin(demoUser))
    };

    const greeting = currentUser.isLoggedIn ? `Hello ${currentUser.name}.` : 'Hello new user.';
    const buttonLabel = currentUser.isLoggedIn ? 'Logout' : 'Login'

    return (
        <div>
            <p>{greeting}</p>
            <button onClick={onButtonClick}>{buttonLabel}</button>
        </div>
    );
}
