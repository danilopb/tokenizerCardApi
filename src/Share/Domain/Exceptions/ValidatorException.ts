import CustomException from "./CustomException";

export default class ValidatorException extends CustomException
{   
    errors: Record<string, string[]>;

    constructor(message: string, errors: Record<string, string[]>)
    {
        super(416, message);
        this.errors = errors;
    }
}
