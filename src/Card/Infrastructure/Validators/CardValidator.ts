import Joi from 'joi';
import BaseValidator from '../../../Share/Infrastructure/Validator/BaseValidator';
import CardNumberValidRule from '../../Domain/Rules/CardNumberValidRule';
import CardTypeFactory from '../../../CardType/Domain/CardTypeFactory';
import NumberLengthRule from '../../../Share/Infrastructure/Rules/NumberLengthRule';
import CardExpirationValidRule from '../../Domain/Rules/CardExpirationValidRule';

export default class CardValidator extends BaseValidator
{
    private static readonly ALLOWED_DOMAINS = ["gmail.com", "hotmail.com", "yahoo.es"];

    rules(): object
    {   
        const cardNumberValidRule = new CardNumberValidRule();
        const numberLengthRule = new NumberLengthRule();
        const cardExpirationValidRule = new CardExpirationValidRule();
        const domainPattern = new RegExp(`^[A-Za-z0-9._%+-]+@(?:${CardValidator.ALLOWED_DOMAINS.join('|')})$`);
        const cardTypeFactory = new CardTypeFactory();
        const cardNumber = this.validationData["card_number"];
        const cartType = cardTypeFactory.createCardType(cardNumber);
        const cvvLength = cartType?.getCvvLength() ?? 3;
        return {
            card_number: Joi.number().min(1e12).max(1e16).custom(cardNumberValidRule.validate).required(),
            cvv: Joi.number()
                .custom((value, helpers) => numberLengthRule.validate(value, helpers, cvvLength)).required(),
            expiration_month: Joi.string().regex(/^(1[0-2]|[1-9])$/).required(),
            expiration_year: Joi.string().length(4).custom(cardExpirationValidRule.validate).required(),
            email: Joi.string().min(5).max(100).email().pattern(domainPattern).required(),
        };
    }
}
