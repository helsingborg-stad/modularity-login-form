import '@babel/polyfill/noConflict';
import LoginForm from './Components/LoginForm.js';

const domElement = document.getElementById('modularity-login-form');

const App = class {
    constructor() {
        this.renderModule();
    }

    renderModule() {
        if (
            typeof ModularityLoginFormObject.token === 'undefined' ||
            ModularityLoginFormObject.token === ''
        ) {
            return;
        }

        ReactDOM.render(
            <div>
                <div id="modularity-login-form-message" />
                <LoginForm />
            </div>,
            domElement
        );
    }
};
new App();
