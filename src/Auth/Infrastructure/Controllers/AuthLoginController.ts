
import { Request, Response } from "express";
import LoginUseCase from "../../Application/LoginUseCase";
import AuthLoginValidator from "../Validators/AuthLoginValidator";

export default class AuthLoginController
{
    private login: LoginUseCase;

    constructor()
    {   
        this.login = new LoginUseCase();
    }

    __invoke(req: Request, res: Response)
    {
        let parameters =  req.body;
        const validator = new AuthLoginValidator();
        validator.validate(parameters);
        let apiToken = this.login.execute(parameters.username, parameters.password);
        return res.status(200).json({ message: 'Autenticación exitosa', api_token: apiToken });
    }
}
 