import { TokenGenerator } from "../Domain/Helpers/TokenGenerator";

export default class CardCreateUniqueTokenUseCase
{
    public execute(): string
    {
        const token = TokenGenerator.generateToken();
        console.log("token:", token);
        return token;
    }
}
