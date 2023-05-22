export class EncryptationData {
    static generateToken(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 16;
        let token = '';
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          const randomChar = characters.charAt(randomIndex);
          token += randomChar;
        }
    
        return token;
    }
}