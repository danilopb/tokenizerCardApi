import NumberValueObjectContract from "../Contracts/NumberValueObjectContract";

export default class NumberValueObject implements NumberValueObjectContract
{
    value: number;
    
    constructor(value: number)
    {
        this.value = value;
    }

    getValue(): number
    {
        return this.value;
    }
}
