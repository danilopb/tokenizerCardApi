import CardEntity from "../CardEntity";
import CardToken from "../ValueObjects/CardToken";
import StoreRequestValueObject from "../ValueObjects/StoreRequestValueObject";

export default interface CardRepositoryContract
{
    findByToken(token: CardToken): Promise<CardEntity | null>
    store(storeRequest: StoreRequestValueObject): Promise<CardEntity>
}
