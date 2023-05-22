import EncryptionService from "../../../Share/Infrastructure/Services/EncryptionService";
import CardEntity from "../CardEntity";
import CardCvv from "../ValueObjects/CardCvv";
import CardEmail from "../ValueObjects/CardEmail";
import CardExpirationMonth from "../ValueObjects/CardExpirationMonth";
import CardExpirationToken from "../ValueObjects/CardExpirationToken";
import CardExpirationYear from "../ValueObjects/CardExpirationYear";
import CardNumber from "../ValueObjects/CardNumber";
import CardToken from "../ValueObjects/CardToken";

export default class CardBuilder 
{
    number?: CardNumber;
    cvv?: CardCvv;
    expirationMonth?: CardExpirationMonth;
    expirationYear?: CardExpirationYear;
    email?: CardEmail;
    token?: CardToken;
    expirationToken?: CardExpirationToken;
    merchantId?: string;
    private encryptionService: EncryptionService;

    constructor()
    {
        this.encryptionService = new EncryptionService()
    }

    public build(): CardEntity
    {
        return new CardEntity(this);
    }
  
    public withNumber(number: CardNumber): CardBuilder
    {
        this.number = number;
        return this;
    }

    public withEncriptNumber(encryptNumber: string): CardBuilder
    {
        const decryptNumber = parseInt(this.encryptionService.decryptData(encryptNumber));
        this.number = new CardNumber(decryptNumber);
        return this;
    }
  
    public withCvv(cvv: CardCvv): CardBuilder
    {
        this.cvv = cvv;
        return this;
    }

    public withEncriptCvv(encryptCvv: string): CardBuilder
    {
        const decryptCvv = parseInt(this.encryptionService.decryptData(encryptCvv));
        this.cvv = new CardCvv(decryptCvv);
        return this;
    }
  
    public withExpirationMonth(expirationMonth: CardExpirationMonth): CardBuilder
    {
        this.expirationMonth = expirationMonth;
        return this;
    }

    public withEncriptExpirationMonth(encryptExpirationMonth: string): CardBuilder
    {
        const decryptExpirationMonth = this.encryptionService.decryptData(encryptExpirationMonth);
        this.expirationMonth = new CardExpirationMonth(decryptExpirationMonth);
        return this;
    }
  
    public withExpirationYear(expirationYear: CardExpirationYear): CardBuilder
    {
        this.expirationYear = expirationYear;
        return this;
    }

    public withEncriptExpirationYear(encryptExpirationYear: string): CardBuilder
    {
        const decryptExpirationYear = this.encryptionService.decryptData(encryptExpirationYear);
        this.expirationYear = new CardExpirationYear(decryptExpirationYear);
        return this;
    }
  
    public withEmail(email: CardEmail): CardBuilder
    {
        this.email = email;
        return this;
    }
  
    public withToken(token: CardToken): CardBuilder
    {
        this.token = token;
        return this;
    }
  
    public withExpirationToken(expirationToken: CardExpirationToken): CardBuilder
    {
        this.expirationToken = expirationToken;
        return this;
    }
}
