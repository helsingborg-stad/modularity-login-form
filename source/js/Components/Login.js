import '@babel/polyfill';
import axios from 'axios';

module.exports = class extends React.Component {
    /**
     * Init
     * @return void
     */
    constructor() {
        super();

        this.state = {
            responseData: [],
            isLoaded: false,
            errors: null,
        };
    }

    /**
     * Getting data from Back-end/API
     * @param type
     * @param archiveId
     * @return void
     */
    getJsonData(type = false, archiveId = false) {
        let apiUrl =
            '/wp-json/LoginForm/v1/Get/?authToken=' +
            ModularityAgreementsArchiveObject.authToken;

        axios
            .get(apiUrl)
            .then(json => {
                const jsonData = json.data.reverse();
                this.setState({
                    responseData: jsonData,
                    isLoaded: true,
                });
            })
            .catch(error => this.setState({ error, isLoaded: true }));
    }

    /**
     * Render jsx
     * @return Render to javaScript
     */
    render() {
        return <div />;
    }
};
