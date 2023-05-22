import DataBaseException from "../../../../Share/Domain/Exceptions/DataBaseException";
import CardEntity from "../../../Domain/CardEntity";
import CardRepositoryContract from "../../../Domain/Contracts/CardRepositoryContract";
import CardEmail from "../../../Domain/ValueObjects/CardEmail";
import CardExpirationToken from "../../../Domain/ValueObjects/CardExpirationToken";
import CardToken from "../../../Domain/ValueObjects/CardToken";
import StoreRequestValueObject from "../../../Domain/ValueObjects/StoreRequestValueObject";
import CardModel from "../Mongo/CardModel";

export default class CardRepository implements CardRepositoryContract
{
    public async findByToken(token: CardToken): Promise<CardEntity | null>
    {
        try {
            const card = await CardModel.findOne({token: token.getValue()}).exec();

            if (!card) return null;

            return CardEntity.builder()
                .withEncriptNumber(card.number)
                .withEncriptCvv(card.cvv)
                .withEncriptExpirationMonth(card.expirationMonth)
                .withEncriptExpirationYear(card.expirationYear)
                .withToken(new CardToken(card.token))
                .withExpirationToken(new CardExpirationToken(card.expirationToken))
                .withEmail(new CardEmail(card.email))
                .build();
        } catch (error) {
            console.log("ERROR:", error)
            throw new DataBaseException(500, 'Problem to find card.');
        }
    }

    public async store(storeRequest: StoreRequestValueObject): Promise<CardEntity>
    {
        try {
            const dataStore = {
                number : storeRequest.getEncryptNumber(),
                cvv: storeRequest.getEncryptCvv(),
                expirationMonth: storeRequest.getEncryptExpirationMonth(),
                expirationYear: storeRequest.getEncryptExpirationYear(),
                email: storeRequest.email.getValue(),
                token: storeRequest.token.getValue(),
                expirationToken: storeRequest.getExpirationToken()
            }
            const cardSaved = await new CardModel(dataStore).save();
            
            return CardEntity.builder()
                .withToken(new CardToken(cardSaved.token))
                .withExpirationToken(new CardExpirationToken(cardSaved.expirationToken))
                .build()
        } catch (error) {
            console.log("ERROR:", error)
            throw new DataBaseException(500, 'Problem to create card.');
        }
    }
}