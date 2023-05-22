import Joi from 'joi';
import BaseValidator from '../../../Share/Infrastructure/Validator/BaseValidator';

export default class AuthLoginValidator extends BaseValidator
{
    rules(): object
    {   
        return {
            username: Joi.string().required(),
            password: Joi.string().required()
        };
    }
}
