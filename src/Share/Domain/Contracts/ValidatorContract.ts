
export default interface ValidatorContract
{
    rules(): any;

    setOptions(schema: any): any;

    validate(data: Array<any>): boolean;

    getFormatErrors(errors: Array<any>): Record<string, string[]>;

    getCustomMessages(): Record<string, string>;
}
