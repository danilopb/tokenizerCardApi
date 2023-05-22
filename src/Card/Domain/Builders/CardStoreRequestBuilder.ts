import StoreRequestValueObject from "../ValueObjects/StoreRequestValueObject";
import CardBuilder from "./CardBuilder";

export default class CardBuilderStoreRequestBuilder extends CardBuilder
{
    public build(): StoreRequestValueObject
    {
        return new StoreRequestValueObject(this);
    }
}
