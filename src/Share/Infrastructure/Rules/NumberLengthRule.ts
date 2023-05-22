import { CustomHelpers, ErrorReport } from "joi";

export default class NumberLengthRule
{
    public validate(value: string, helpers: CustomHelpers, size: number): string | ErrorReport
    {
        const stringValue = String(value);
        return stringValue.length === size ?  value : helpers.error('number.length', {size});
    }
}
