export default interface CardType 
{
    isCardType(cardNumber: string): boolean;
    getName(): string;
    getCvvLength(): number;
}
