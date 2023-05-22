import CardEntity from "../Domain/CardEntity";
import CardRepositoryContract from "../Domain/Contracts/CardRepositoryContract";
import CardToken from "../Domain/ValueObjects/CardToken";
import CardRepository from "../Infrastructure/Repositories/Mongo/CardRepository";

export default class CardFindByTokenUseCase
{   
    private repository: CardRepositoryContract;

    constructor()
    {
        this.repository = new CardRepository();
    }

    public async execute(token: string): Promise <CardEntity | null>
    {
        return this.repository.findByToken(new CardToken(token));
    }
}
