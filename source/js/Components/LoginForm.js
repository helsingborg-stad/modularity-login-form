import axios from 'axios';

export default class extends React.Component {
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
     * @return void
     */
    requestLogin() {
        this.setState({ isLoaded: false });
        const username = document.getElementById('authUsername').value;
        const password = document.getElementById('authPassword').value;
        axios
            .post(
                '/wp-json/ModularityLoginForm/v1/Authentication/Login?token=' +
                    ModularityLoginFormObject.token +
                    '&moduleId=' +
                    ModularityLoginFormObject.moduleId +
                    '&username=' +
                    username +
                    '&password=' +
                    password +
                    '&page=' +
                    ModularityLoginFormObject.page
            )
            .then(json => {
                this.setState({ isLoaded: false });
                document
                    .getElementById('modularity-login-form-message')
                    .removeAttribute('class');
                switch (json.data.state) {
                    case 'error':
                        this.setState({ isLoaded: true });
                        document.getElementById(
                            'modularity-login-form-message'
                        ).innerHTML =
                            ' <i class="pricon pricon-notice-warning"></i>' +
                            json.data.message;

                        document
                            .getElementById('modularity-login-form-message')
                            .classList.add('danger', 'notice', 'notice-sm');

                        break;

                    case 'success':
                        const timeout = ModularityLoginFormObject.timeout;
                        setTimeout(timeout => {
                            document.getElementById(
                                'modularity-login-form-message'
                            ).innerHTML =
                                ' <i class="pricon pricon-check"></i>' +
                                timeout;

                            document
                                .getElementById('modularity-login-form-message')
                                .classList.add(
                                    'success',
                                    'notice',
                                    'notice-sm'
                                );
                        }, 200);

                        location.href = json.data.url;
                        break;

                    default:
                        console.log('Yawn, ZZzzzZZzzzZZzzzzzzzzzz!');
                }
            })
            .catch(error => 'error');
    }

    /**
     * Render jsx
     * @return Render to javaScript
     */
    render() {
        return !this.state.isLoaded ? (
            <div className="gutter">
                <div className="loading">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        ) : (
            <form>
                <div className="form-horizontal">
                    <div className="form-group">
                        <input
                            type="text"
                            name="authUsername"
                            id="authUsername"
                            autoComplete="username"
                            placeholder={
                                ModularityLoginFormObject.translation.username
                            }
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="authPassword"
                            id="authPassword"
                            autoComplete="current-password"
                            placeholder={
                                ModularityLoginFormObject.translation.password
                            }
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
                            {ModularityLoginFormObject.translation.loginbtn}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
