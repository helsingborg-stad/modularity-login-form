import '@babel/polyfill/noConflict';
import axios from 'axios';

const App = class {
    constructor() {
        this.state = {
            responseData: [],
            isLoaded: false,
            errors: null,
        };
        this.renderModule();
    }

    /**
     * Send Login details to API
     * @return void
     */
    requestLogin() {
        let username = document.getElementById('authUsername').value;
        const password = document.getElementById('authPassword').value;
        const apiUrl =
            '/wp-json/ModularityLoginForm/v1/?token=' +
            ModularityLoginFormObject.token +
            '&username=' +
            username +
            '&password=' +
            password;

        axios
            .get(apiUrl)
            .then(json => {
                const jsonData = json.data.reverse();
                console.log(jsonData);
            })
            .catch(error => 'error');
    }

    /**
     * Render Module
     * @return jsx
     */
    renderModule() {
        if (
            typeof ModularityLoginFormObject.token === 'undefined' ||
            ModularityLoginFormObject.token === ''
        ) {
            return;
        }

        ReactDOM.render(
            <div className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="authUsername">
                        {ModularityLoginFormObject.translation.username}
                    </label>
                    <input
                        type="text"
                        name="authUsername"
                        id="authUsername"
                        placeholder={
                            ModularityLoginFormObject.translation.username
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authPassword">
                        {ModularityLoginFormObject.translation.password}
                    </label>
                    <input
                        type="password"
                        name="authPassword"
                        id="authPassword"
                        placeholder={
                            ModularityLoginFormObject.translation.password
                        }
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-primary"
                        value={ModularityLoginFormObject.translation.loginbtn}
                        onClick={() => this.requestLogin()}
                    />
                </div>
            </div>,
            document.getElementById('modularity-login-form')
        );
    }
};

new App();
