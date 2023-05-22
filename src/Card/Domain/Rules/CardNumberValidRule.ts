import { CustomHelpers, ErrorReport } from "joi";
import LuhnAlgorithm from "../Helpers/LuhnAlgoritm";

export default class CardNumberValidRule
{
    public validate(value: string, helpers: CustomHelpers): string | ErrorReport
    {
        return LuhnAlgorithm.validateCreditCardNumber(value) ?  value : helpers.error('any.invalid');
    }
}
