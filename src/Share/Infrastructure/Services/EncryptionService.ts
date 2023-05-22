import * as crypto from 'crypto';

export default class EncryptionService
{
    private readonly algorithm: string;
    private readonly secretKey: string;
  
    constructor()
    {
        this.algorithm = 'aes-256-cbc';
        this.secretKey = '1GFHSm4t8d8cVbxXXQGLG2BlAx2SdSc"';
    }
  
    public encryptData(data: string): string
    {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);
        let encryptedData = cipher.update(data, 'utf8', 'base64');
        encryptedData += cipher.final('base64');
        const encryptedPayload = `${iv.toString('base64')}:${encryptedData}`;
        return encryptedPayload;
    }
  
    public decryptData(encryptedData: string): string
    {
        const [ivEncoded, encryptedPayload] = encryptedData.split(':');
        const iv = Buffer.from(ivEncoded, 'base64');
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, iv);
        let decryptedData = decipher.update(encryptedPayload, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    }
}
