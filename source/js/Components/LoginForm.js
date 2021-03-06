import axios from "axios";
import PropTypes from "prop-types";
import Notice from "../Helpers/Notice";

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
		fullUsername: PropTypes.string,
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

		const element = document.getElementById("modularity-login-form-message");

		const { moduleId, page, token, translation, restUrl } = this.props;

		let username = null;
		let password = null;
		let type = null;
		let loginVars = null;

		if (element) {
			document.getElementById("modularity-login-form-message").classList.add("hidden");
		}

		if (document.body.classList.contains("logged-in")) {
			type = "Logout";
			document.body.classList.remove("logged-in");
		} else {
			username = document.getElementById("authUsername").value;
			password = document.getElementById("authPassword").value;
			type = "Login";
			loginVars = "&username=" + username + "&password=" + password;
		}

		const apiUrl =
			"ModularityLoginForm/v1/Authentication/" +
			type +
			"?token=" +
			token +
			"&moduleId=" +
			moduleId +
			"&page=" +
			page +
			loginVars;

		axios
			.post(restUrl + apiUrl)
			.then(json => {
				this.setState({ isLoaded: false });
				let { message, transfer } = "";

				switch (json.data.state) {
					case "error":
						this.setState({ isLoaded: true });
						message = {
							container: {
								parent: "modularity-login-form",
								child: "modularity-login-form-message",
							},
							text: json.data.message,
							style: {
								box: ["danger", "notice"],
								icon: "pricon-notice-warning",
							},
						};

						Notice.showNotice(message);
						break;

					case "success":
						if (loginVars !== null) {
							message = {
								container: {
									parent: "modularity-login-form",
									child: "modularity-login-form-message",
								},
								text:
									translation.welcome +
									" " +
									json.data.user.display_name +
									"<br>" +
									translation.prepareLogin,
								style: {
									box: ["success", "notice"],
									icon: "pricon-enter",
								},
							};
						} else {
							message = {
								container: {
									parent: "modularity-login-form",
									child: "modularity-login-form-message",
								},
								text: translation.prepareLogout,
								style: {
									box: ["info", "notice"],
									icon: "pricon-standby",
								},
							};
						}

						Notice.showNotice(message);

						//Just refresh page if logging out
						if (loginVars === null) {
							setTimeout(() => location.reload(), 600);
							return;
						}

						transfer = json.data.url.replace(/\\/g, "");
						setTimeout(() => window.location.replace(transfer), 600);

						break;

					default:
						return null;
				}
				element.classList.remove("hidden");
			})
			.catch(error => "error");
	}

	/**
	 * Submit the login form
	 * @returns {boolean}
	 */
	handleSubmit() {
		const username = document.getElementById("authUsername").value;
		const password = document.getElementById("authPassword").value;
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
		const { translation, fullUsername, createAccount } = this.props;
		console.log("TCL: LoginForm -> render -> createAccount", typeof createAccount);
		const { isLoaded } = this.state;
		const hideMarkup = !isLoaded ? "hidden" : "";

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
				{isLoaded && document.body.classList.contains("logged-in") !== true ? (
					<form
						onSubmit={e => {
							e.preventDefault();
						}}
					>
						<div className="form-horizontal">
							<div className="form-group grid-md-12">
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
							<div className="form-group grid-md-12">
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
							<div className="form-group grid-md-12">
								<div className="grid grid-va-middle">
									<div className="grid-xs-12 grid-sm-fit-content grid-md-fit-content u-mr-auto">
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
									{createAccount && (
										<div className="grid-xs-12 grid-sm-fit-content grid-md-fit-content">
											<a
												className="forgott-password"
												href={createAccount.url}
											>
												{createAccount.title}
											</a>
										</div>
									)}

									<div className="grid-xs-12 grid-sm-fit-content grid-md-fit-content">
										<a
											className="forgott-password"
											href="/wp-login.php?action=lostpassword"
										>
											{translation.forgotpasswd}
										</a>
									</div>
								</div>
							</div>
						</div>
					</form>
				) : (
					<div className={"grid user-logged-in " + hideMarkup + " ha"}>
						<div className="user-data">
							<h5>{translation.loggedIn + " " + fullUsername}</h5>
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
								{translation.logoutbtn}
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}
