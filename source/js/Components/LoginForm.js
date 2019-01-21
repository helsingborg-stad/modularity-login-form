import axios from 'axios';
import PropTypes from 'prop-types';
import Notice from '../Helpers/Notice';

export default class LoginForm extends React.Component {
    /**
     *
     * @type {{translation: shim, page: shim, moduleId: shim, token: shim}}
     */
    static propTypes = {
        moduleId: PropTypes.number,
        page: PropTypes.string,
        token: PropTypes.string,
        translation: PropTypes.objectOf(PropTypes.string),
    };

    /**
     * Init
     * @return void
     */
    constructor() {
        super();
        this.state = {
            isLoaded: true,
        };
    }

    /**
     * Send Login details to API
     * @return void || null
     */
    requestLogin() {
        this.setState({ isLoaded: false });

        const element = document.getElementById('modularity-login-form-message');
        const { moduleId, page, token, translation } = this.props;
        let username = null;
        let password = null;
        let type;
        let loginVars = '';

        if (element) {
            document.getElementById('modularity-login-form-message').classList.add('hidden');
        }

        if (document.body.classList.contains('logged-in')) {
            type = 'Logout';
            document.body.classList.remove('logged-in');
        } else {
            username = document.getElementById('authUsername').value;
            password = document.getElementById('authPassword').value;
            type = 'Login';
            loginVars = '&username=' + username + '&password=' + password;
        }

        const apiUrl =
            '/wp-json/ModularityLoginForm/v1/Authentication/' +
            type +
            '?token=' +
            token +
            '&moduleId=' +
            moduleId +
            '&page=' +
            page +
            loginVars;

        axios
            .post(apiUrl)
            .then(json => {
                this.setState({ isLoaded: false });
                let { message, transfer } = '';

                switch (json.data.state) {
                    case 'error':
                        this.setState({ isLoaded: true });
                        message = {
                            container: {
                                parent: 'modularity-login-form',
                                child: 'modularity-login-form-message',
                            },
                            text: json.data.message,
                            style: {
                                box: ['danger', 'notice', 'notice-sm'],
                                icon: 'pricon-notice-warning',
                            },
                        };

                        Notice.showNotice(message);
                        break;

                    case 'success':
                        console.log('success');

                        if (document.body.classList.contains('logged-in')) {
                            message = {
                                container: {
                                    parent: 'modularity-login-form',
                                    child: 'modularity-login-form-message',
                                },
                                text:
                                    translation.welcome +
                                    ' ' +
                                    json.data.user.display_name +
                                    '<br>' +
                                    translation.prepareLogin,
                                style: {
                                    box: ['success', 'notice', 'notice-sm'],
                                    icon: 'pricon-enter',
                                },
                            };
                        } else {
                            message = {
                                container: {
                                    parent: 'modularity-login-form',
                                    child: 'modularity-login-form-message',
                                },
                                text: translation.prepareLogout,
                                style: {
                                    box: ['success', 'notice', 'notice-sm'],
                                    icon: 'pricon-enter',
                                },
                            };
                        }

                        console.log('EDWARD');
                        Notice.showNotice(message);
                        transfer = json.data.url.replace(/\\/g, '');
                        console.log(transfer);
                        setTimeout(() => window.location.replace(transfer), 1000);

                        break;

                    default:
                        return null;
                }
                element.classList.remove('hidden');
            })
            .catch(error => 'error');
    }

    /**
     * Submit the login form
     * @returns {boolean}
     */
    handleSubmit() {
        const username = document.getElementById('authUsername').value;
        const password = document.getElementById('authPassword').value;
        if (username && password) {
            this.requestLogin();
        }
        return false;
    }

    /**
     * Render jsx
     * @return Render to javaScript
     */
    render() {
        const { translation } = this.props;
        const { isLoaded } = this.state;
        const hideLogout = !isLoaded ? 'hidden' : '';

        return (
            <div>
                {!isLoaded ? (
                    <div className="gutter">
                        <div className="loading">
                            <div />
                            <div />
                            <div />
                            <div />
                        </div>
                    </div>
                ) : null}

                {isLoaded && document.body.classList.contains('logged-in') !== true ? (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <div className="form-horizontal">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="authUsername"
                                    id="authUsername"
                                    autoComplete="username"
                                    placeholder={translation.username}
                                    onChange={ev => {
                                        ev.preventDefault();
                                    }}
                                    onKeyPress={event => {
                                        if (event.which === 13 || event.keyCode === 13) {
                                            this.handleSubmit();
                                            return false;
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="authPassword"
                                    id="authPassword"
                                    autoComplete="current-password"
                                    placeholder={translation.password}
                                    onChange={ev => {
                                        ev.preventDefault();
                                    }}
                                    onKeyPress={event => {
                                        if (event.which === 13 || event.keyCode === 13) {
                                            this.handleSubmit();
                                            return false;
                                        }
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={ev => {
                                        ev.preventDefault();
                                        this.requestLogin();
                                    }}
                                >
                                    {translation.loginbtn}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="form-group">
                        <button
                            type="button"
                            className={hideLogout + ' btn btn-primary'}
                            onClick={ev => {
                                ev.preventDefault();
                                this.requestLogin();
                            }}
                        >
                            {translation.logoutbtn}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
