'use strict';

import Login from './Components/Login.js';

const domElement = document.getElementById('modularity-login-form');

const App = class {
    constructor() {
        this.renderModule();
    }

    renderModule() {
        if (
            typeof ModularityLoginFormObject === 'undefined' ||
            domElement == null ||
            typeof ModularityLoginFormObject.authToken === 'undefined'
        ) {
            return;
        }

        ReactDOM.render(
            <Login token={ModularityLoginFormObject.authToken} />,
            domElement
        );
    }
};

new App();
