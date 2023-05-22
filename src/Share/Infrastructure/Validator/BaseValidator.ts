import Joi from 'joi';
import ValidatorException from '../../../Share/Domain/Exceptions/ValidatorException';
import ValidatorContract from '../../Domain/Contracts/ValidatorContract';

export default class BaseValidator implements ValidatorContract
{   
    validationData: any = {};
    
    rules(): any {
        return Joi.object({});
    }

    setOptions(schema: any): any {
        return schema.messages(this.getCustomMessages());
    }

    validate(data: any): boolean
    {   
        this.validationData = data;
        let schema = Joi.object(this.rules());
        schema = this.setOptions(schema);
        schema.messages(this.getCustomMessages());
        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            const errorMessages = this.getFormatErrors(error.details);
            throw new ValidatorException('Errores en los datos enviados', errorMessages);
        }

        return true;
    }

    getFormatErrors(errors: Array<any>): Record<string, string[]>
    {
        let errorsResponse: Record<string, string[]> = {};
        errors.map((detail) => {
            errorsResponse[detail.context.label] = detail.message.replace(/['"]/g, "");
        });
        return errorsResponse;
    }

    getCustomMessages(): Record<string, string>
    {
        return {
            "any.required": "El campo {#label} es requerido.",
            "any.invalid": "El campo {#label} contiene un valor no válido.",
            "any.empty": "El campo {#label} no debe estar vacío.",
            "string.base": "El campo {#label} debe ser una cadena de caracteres.",
            "string.min": "El campo {#label} debe tener al menos {#limit} caracteres.",
            "string.max": "El campo {#label} no debe exceder los {#limit} caracteres.",
            "string.email": "El campo {#label} debe ser una dirección de correo electrónico válida.",
            "string.pattern.base": "El campo {#label} tiene un valor no válido.",
            "number.base": "El campo {#label} debe ser un número.",
            "number.min": "El campo {#label} debe ser mayor o igual a {#limit}.",
            "number.max": "El campo {#label} debe ser menor o igual a {#limit}.",
            "number.integer": "El campo {#label} debe ser un número entero.",
            "number.length": "El campo {#label} debe tener {#size} dígitos.",
            "array.base": "El campo {#label} debe ser un arreglo.",
            "array.min": "El campo {#label} debe tener al menos {#limit} elementos.",
            "array.max": "El campo {#label} no debe exceder los {#limit} elementos.",
            "object.base": "El campo {#label} debe ser un objeto.",
            "object.unknown": "El campo {#label} contiene claves no permitidas.",
            "object.missing": "Faltan las siguientes claves requeridas: {#peers}."
        }
    }
}
