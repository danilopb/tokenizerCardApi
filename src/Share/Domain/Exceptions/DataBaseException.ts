import CustomException from "./CustomException";

export default class DataBaseException extends CustomException
{
    constructor(status: number, message: string)
    {
        super(status, message);
    }
}
