import "@babel/polyfill/noConflict";
import LoginForm from "./Components/LoginForm.js";

const App = class {
	constructor() {
		this.renderModule();
	}

	/**
	 * Render Module
	 */
	renderModule() {
		const domElements = document.getElementsByClassName("modularity-login-form-react");
		for (let i = 0; i < domElements.length; i++) {
			const element = domElements[i];
			const dataAttributes = JSON.parse(element.getAttribute("data-login-form"));

			const { translation } = ModularityLoginFormObject;

			const { token, moduleId, page, fullusername, restUrl, createAccount } = dataAttributes;

			if (typeof token === "undefined" || token === "") {
				return;
			}

			ReactDOM.render(
				<LoginForm
					moduleId={Number(moduleId)}
					page={page}
					token={token}
					translation={translation}
					fullUsername={fullusername}
					restUrl={restUrl}
					createAccount={typeof createAccount !== "undefined" ? createAccount : null}
				/>,
				element
			);
		}
	}
};
new App();
