import {SuccessfulApiResponse} from "../generalResponses/SuccessfulApiResponse.js";

export class RegistrationSuccessful extends SuccessfulApiResponse {
    static defaultResponse() {
        return {
            "message": "Account successfully created"
        }
    }
}