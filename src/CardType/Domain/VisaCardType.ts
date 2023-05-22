import CardType from "./Contracts/CardType";

export default class VisaCardType implements CardType
{
    private cardType = 'Visa';
  
    isCardType(cardNumber: string): boolean 
    {
      return /^4\d{3}[\d\s-]{11,16}$/.test(cardNumber);
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
