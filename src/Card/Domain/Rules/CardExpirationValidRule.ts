import { CustomHelpers, ErrorReport } from "joi";

export default class CardExpirationValidRule
{
    public validate(value: string, helpers: CustomHelpers): string | ErrorReport
    {
        const paramYear = parseInt(value)
        const currentYear = new Date().getFullYear();
        const futureYear = currentYear + 5;
        return paramYear >= currentYear && paramYear <= futureYear ?
                  value : helpers.error('any.invalid');
    }
}
