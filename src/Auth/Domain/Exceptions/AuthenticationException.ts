import CustomException from "../../../Share/Domain/Exceptions/CustomException";

export default class AuthenticationException extends CustomException
{   
    constructor(message: string)
    {
        super(401, message);
    }
}
