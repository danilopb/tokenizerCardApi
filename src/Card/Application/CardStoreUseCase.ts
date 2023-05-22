import CardEntity from "../Domain/CardEntity";
import CardRepositoryContract from "../Domain/Contracts/CardRepositoryContract";
import CardCvv from "../Domain/ValueObjects/CardCvv";
import CardEmail from "../Domain/ValueObjects/CardEmail";
import CardExpirationMonth from "../Domain/ValueObjects/CardExpirationMonth";
import CardExpirationYear from "../Domain/ValueObjects/CardExpirationYear";
import CardNumber from "../Domain/ValueObjects/CardNumber";
import CardToken from "../Domain/ValueObjects/CardToken";
import StoreRequestValueObject from "../Domain/ValueObjects/StoreRequestValueObject";
import CardRepository from "../Infrastructure/Repositories/Mongo/CardRepository";

export default class CardStoreUseCase
{   
    private repository: CardRepositoryContract;

    constructor()
    {
        this.repository = new CardRepository();
    }

    public async execute(parameters: any): Promise <CardEntity>
    {
        const storeRequest = StoreRequestValueObject.builder()
                                .withNumber(new CardNumber(parameters.card_number))
                                .withCvv(new CardCvv(parameters.cvv))
                                .withExpirationMonth(new CardExpirationMonth(parameters.expiration_month))
                                .withExpirationYear(new CardExpirationYear(parameters.expiration_year))
                                .withEmail(new CardEmail(parameters.email))
                                .withToken(new CardToken(parameters.token))
                                .build();
        return this.repository.store(storeRequest as StoreRequestValueObject);
    }
}
