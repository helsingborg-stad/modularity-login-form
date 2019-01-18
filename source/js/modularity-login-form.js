import '@babel/polyfill/noConflict';
import LoginForm from './Components/LoginForm.js';

const domElement = document.getElementById('modularity-login-form');

const App = class {
    constructor() {
        this.renderModule();
    }

    /**
     * Render Module
     */
    renderModule() {
        const { token, moduleId, page, translation } = ModularityLoginFormObject;
        if (typeof token === 'undefined' || token === '') {
            return;
        }

        ReactDOM.render(
            <div>
                <LoginForm
                    moduleId={Number(moduleId)}
                    page={page}
                    token={token}
                    translation={translation}
                />
            </div>,
            domElement
        );
    }
};
new App();
