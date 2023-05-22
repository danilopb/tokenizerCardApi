import CardBuilder from "./Builders/CardBuilder";
import CardContract from "./Contracts/CardContract";
import CardCvv from "./ValueObjects/CardCvv";
import CardEmail from "./ValueObjects/CardEmail";
import CardExpirationMonth from "./ValueObjects/CardExpirationMonth";
import CardExpirationToken from "./ValueObjects/CardExpirationToken";
import CardExpirationYear from "./ValueObjects/CardExpirationYear";
import CardNumber from "./ValueObjects/CardNumber";
import CardToken from "./ValueObjects/CardToken";

export default class CardEntity implements CardContract
{
    number: CardNumber;
    cvv: CardCvv;
    expirationMonth: CardExpirationMonth;
    expirationYear: CardExpirationYear;
    email: CardEmail;
    token: CardToken;
    expirationToken: CardExpirationToken;
    merchantId: string;
  
    constructor(builder: CardBuilder)
    {
        this.number = builder.number!;
        this.cvv = builder.cvv!;
        this.expirationMonth = builder.expirationMonth!;
        this.expirationYear = builder.expirationYear!;
        this.email = builder.email!;
        this.token = builder.token!;
        this.expirationToken = builder.expirationToken!;
        this.merchantId = builder.merchantId!;
    }

    public static builder(): CardBuilder
    {
        return new CardBuilder();
    }

    public isTokenExpired(): boolean
    {
        const current = new Date();
        return this.expirationToken.getValue() < current;
    }
}
