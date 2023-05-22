export default interface CardModelContract
{
    number: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
    email: string;
    token: string;
    expirationToken: Date;
    merchantId: string;
}
