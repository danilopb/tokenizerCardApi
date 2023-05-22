import { TokenGenerator } from "../Domain/Helpers/TokenGenerator";

export default class CardCreateUniqueTokenUseCase
{
    // TODO: Implementar la lógica para verificar que el token sea unico
    public execute(): string
    {
        const token = TokenGenerator.generateToken();
        return token;
    }
}
