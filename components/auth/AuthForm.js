import PropTypes from 'prop-types';

export default function AuthForm({ type, onFormSubmit, authError }) {
    return (
        <form
            onSubmit={onFormSubmit}
        >
            {type === 'register' &&
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
            }
            <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
            {authError &&
                <p>{authError.message}</p>
            }
        </form>
    );
}

AuthForm.propTypes = {
    type: PropTypes.string,
    onFormSubmit: PropTypes.func,
    authError: PropTypes.object
};
