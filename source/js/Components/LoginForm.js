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
            messageText: null,
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
                            text: json.data.message,
                            style: {
                                box: ['danger', 'notice', 'notice-sm'],
                                icon: 'pricon-notice-warning',
                            },
                        };

                        this.setState({ messageText: message });
                        this.apiMessage();

                        break;

                    case 'success':
                        message = {
                            text:
                                ModularityLoginFormObject.translation.welcome +
                                ' ' +
                                json.data.user.display_name +
                                '<br>' +
                                ModularityLoginFormObject.translation.prepareLogin,
                            style: {
                                box: ['success', 'notice', 'notice-sm'],
                                icon: 'pricon-enter',
                            },
                        };

                        this.setState({ messageText: message });
                        this.apiMessage();

                        let transfer = (location.href = json.data.url.replace(/\\/g, ''));
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
     * @return void
     */
    apiMessage() {
        if (!document.getElementById('modularity-login-form-message')) {
            const createMessageContainer = document.createElement('div');

            createMessageContainer.setAttribute('id', 'modularity-login-form-message');
            document.getElementById('modularity-login-form').appendChild(createMessageContainer);
        }

        const messageContainer = document.getElementById('modularity-login-form-message');
        messageContainer.innerHTML = '';
        messageContainer.removeAttribute('class');

        const object = this.state.messageText;
        messageContainer.classList.add(...object.style.box);

        const createMessageContainerIcon = document.createElement('i');
        createMessageContainerIcon.setAttribute('class', 'pricon');
        messageContainer.appendChild(createMessageContainerIcon);
        messageContainer.firstChild.classList.add(object.style.icon);
        messageContainer.insertAdjacentHTML('beforeend', object.text);
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
