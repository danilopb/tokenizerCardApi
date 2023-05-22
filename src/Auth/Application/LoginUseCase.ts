import AuthenticationException from "../Domain/Exceptions/AuthenticationException";

export default class LoginUseCase
{   
    public execute(username: string, password: string): string
    {
        const userEnv = process.env.USER ?? '';
        const passwordEnv = process.env.PASSWORD ?? '';

        if (userEnv && passwordEnv &&  (username === userEnv && password === passwordEnv)) {
            const apiToken = process.env.API_TOKEN ?? '';
            return apiToken;
        }

        throw new AuthenticationException("Las credenciales no son correctas");
    }
}
