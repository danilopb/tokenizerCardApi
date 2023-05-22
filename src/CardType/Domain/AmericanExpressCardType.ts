import CardType from "./Contracts/CardType";

export default class AmericanExpressCardType implements CardType
{
    private cardType = 'American Express';
  
    isCardType(cardNumber: string): boolean
    {
      return /^3[47]\d{2}[\d\s-]{11,14}$/.test(cardNumber);
    }
  
    getName(): string
    {
        return this.cardType;
    }

    getCvvLength(): number
    {
        return 4;
    }
}
