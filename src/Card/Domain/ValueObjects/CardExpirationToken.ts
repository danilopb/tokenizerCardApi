export default class CardExpirationToken
{
    private readonly value: Date;
  
    constructor(value: Date)
    {
      this.value = value;
    }
  
    getValue(): Date
    {
      return this.value;
    }
}
