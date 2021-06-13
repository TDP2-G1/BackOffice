import {ServerErrorResponse} from "../responses/generalResponses/ServerErrorResponse.js";
import {ErrorApiResponse} from "../responses/generalResponses/ErrorApiResponse.js";
import {GetProfileEndpoint} from "../endpoints/GetProfileEndpoint.js";
import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {RegisterEndpoint} from "../endpoints/RegisterEndpoint";


class ApiClient {
    constructor(requester, onServerErrorDo = () => {
    }) {
        this._requester = requester;
        this._handleServerError = onServerErrorDo;
        this._handleResponse = this._handleResponse.bind(this);
    }

    _handleResponse(response, onResponse) {
        if (response.status === 500) {
            console.log("Server error: ", response);
            return this._handleServerError(response);
        }

        return onResponse(response);
    }

    login(data, onResponse) {
        return this._requester.call({
            endpoint: new LoginEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    register(data, onResponse) {
        return this._requester.call({
            endpoint: new RegisterEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse),
            data: data
        });
    }

    getProfile(onResponse) {
        return this._requester.call({
            endpoint: new GetProfileEndpoint(),
            onResponse: (response) => this._handleResponse(response, onResponse)
        });
    }
}

export default ApiClient;