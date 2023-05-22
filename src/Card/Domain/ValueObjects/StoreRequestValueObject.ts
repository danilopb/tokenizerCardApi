import { DateHelper } from "../../../Share/Domain/Helpers/DateHelper";
import EncryptionService from "../../../Share/Infrastructure/Services/EncryptionService";
import CardBuilderStoreRequestBuilder from "../Builders/CardStoreRequestBuilder";
import CardEntity from "../CardEntity";

export default class StoreRequestValueObject extends CardEntity
{
    private encryptionService: EncryptionService;
    private minutesToExpiredToken;

    constructor(builder: CardBuilderStoreRequestBuilder)
    {
       super(builder);
       this.encryptionService = new EncryptionService();
       this.minutesToExpiredToken = process.env.CARD_TOKEN_MINUTES_TO_EXPIRED ?
            parseInt(process.env.CARD_TOKEN_MINUTES_TO_EXPIRED) : 
            15;
    }

    public static builder(): CardBuilderStoreRequestBuilder
    {
        return new CardBuilderStoreRequestBuilder();
    }

    getExpirationToken(): Date
    {
        return DateHelper.addminutes(new Date(), this.minutesToExpiredToken);
    }

    getEncryptNumber(): string
    {
        return this.encryptionService.encryptData(this.number.getValue().toString());
    }

    getEncryptCvv(): string
    {
        return this.encryptionService.encryptData(this.cvv.getValue().toString());
    }

    getEncryptExpirationMonth(): string
    {
        return this.encryptionService.encryptData(this.expirationMonth.getValue());
    }

    getEncryptExpirationYear(): string
    {
        return this.encryptionService.encryptData(this.expirationYear.getValue());
    }
}
