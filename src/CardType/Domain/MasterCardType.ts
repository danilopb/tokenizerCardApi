import CardType from "./Contracts/CardType";

export default class MastercardCardType implements CardType
{
    private cardType = 'Mastercard';
  
    isCardType(cardNumber: string): boolean
    {
      return /^5[1-5]\d{2}[\d\s-]{11,14}$/.test(cardNumber);
    }
  
    getName(): string
    {
        return this.cardType;
    }

    getCvvLength(): number
    {
        return 3;
    }
}
