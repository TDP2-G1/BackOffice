import {Endpoint} from "./Endpoint.js";
import {RegistrationSuccessful} from "../responses/register/RegistrationSuccessful";

export class RegisterEndpoint extends Endpoint {
    static url() {
        return '/register/'
    }

    ownResponses() {
        return [RegistrationSuccessful];
    }

    method() {
        return 'POST'
    }

    needsAuthorization() {
        return false;
    }
}