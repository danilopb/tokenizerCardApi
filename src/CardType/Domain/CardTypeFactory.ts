import AmericanExpressCardType from "./AmericanExpressCardType";
import CardType from "./Contracts/CardType";
import MastercardCardType from "./MasterCardType";
import VisaCardType from "./VisaCardType";

export default class CardTypeFactory
{
    private cardTypes: CardType[] = [];
  
    constructor()
    {
      this.cardTypes.push(new VisaCardType());
      this.cardTypes.push(new MastercardCardType());
      this.cardTypes.push(new AmericanExpressCardType());
    }
  
    createCardType(cardNumber: string): CardType | null 
    {
        const cardType = this.cardTypes.find((cartType) => cartType.isCardType(cardNumber));
        return cardType ?? null;
    }
}
