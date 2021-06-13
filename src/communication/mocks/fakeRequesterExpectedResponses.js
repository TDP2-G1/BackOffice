import {GetProfileEndpoint} from "../endpoints/GetProfileEndpoint";
import {GetProfileSuccessful} from "../responses/profiles/GetProfileSuccessful";
import {LoginEndpoint} from "../endpoints/LoginEndpoint";
import {RegisterEndpoint} from "../endpoints/RegisterEndpoint";
import {LoginSuccessful} from "../responses/login/LoginSuccessful";
import {RegistrationSuccessful} from "../responses/register/RegistrationSuccessful";
import {InvalidCredentials} from "../responses/login/InvalidCredentials";


const fakeRequesterExpectedResponses = () => {
    return {
        [GetProfileEndpoint.name]: GetProfileSuccessful,
        [LoginEndpoint.name]: LoginSuccessful,
        [RegisterEndpoint.name]: RegistrationSuccessful,
    }
};

export default fakeRequesterExpectedResponses;