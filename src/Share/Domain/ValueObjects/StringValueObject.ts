import StringValueObjectContract from "../Contracts/StringValueObjectContract";

export default class StringValueObject implements StringValueObjectContract
{
    value: string;

    constructor(value: string)
    {
        this.value = value;
    }

    getValue(): string
    {
        return this.value;
    } 
}
