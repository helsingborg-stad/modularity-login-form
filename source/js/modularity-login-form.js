import '@babel/polyfill/noConflict';
import LoginForm from './Components/LoginForm.js';

const App = class {
    constructor() {
        this.renderModule();
    }

    /**
     * Render Module
     */
    renderModule() {
        const domElements = document.getElementsByClassName('modularity-login-form-react');
        for (let i = 0; i < domElements.length; i++) {
            const element = domElements[i];

            const { token, moduleId, page, translation, fullusername } = ModularityLoginFormObject;
            if (typeof token === 'undefined' || token === '') {
                return;
            }

            ReactDOM.render(
                <LoginForm
                    moduleId={Number(moduleId)}
                    page={page}
                    token={token}
                    translation={translation}
                    fullUsername={fullusername}
                />,
                element
            );
        }
    }
};
new App();
