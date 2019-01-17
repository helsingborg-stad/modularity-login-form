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
     * @return void || null
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
                let message;

                switch (json.data.state) {
                    case 'error':
                        this.setState({ isLoaded: true });
                        message = {
                            data: json.data.message,
                            style: {
                                box: ['danger', 'notice', 'notice-sm'],
                                icon: 'pricon-notice-warning',
                            },
                        };
                        this.apiMessage(message);

                        break;

                    case 'success':
                        message = {
                            data:
                                json.data.message +
                                ModularityLoginFormObject.translation.prepareLogin,
                            style: {
                                box: ['success', 'notice', 'notice-sm'],
                                icon: 'pricon-enter',
                            },
                        };

                        this.apiMessage(message);
                        let transfer = (location.href = decodeURIComponent(json.data.url));
                        setTimeout(() => transfer, 1000);

                        break;

                    default:
                        return null;
                }
            })
            .catch(error => 'error');
    }

    /**
     * Creates Login Notice
     * @param object
     */
    apiMessage(object) {
        const messageContainer = document.getElementById('modularity-login-form-message');

        messageContainer.removeAttribute('class');
        messageContainer.classList.add(...object.style.box);
        messageContainer.innerHTML = '';
        messageContainer.insertAdjacentHTML('afterbegin', '<i class="pricon"></i>');

        let message = document.createTextNode(object.data);

        messageContainer.appendChild(message);
        messageContainer.firstChild.classList.add(object.style.icon);
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
                            placeholder={ModularityLoginFormObject.translation.username}
                            onChange={ev => {
                                ev.preventDefault();
                                if (ev.keyCode == 13) {
                                    return true;
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
                            placeholder={ModularityLoginFormObject.translation.password}
                            onChange={ev => {
                                ev.preventDefault();
                                if (ev.keyCode == 13) {
                                    return true;
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
                            {ModularityLoginFormObject.translation.loginbtn}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
