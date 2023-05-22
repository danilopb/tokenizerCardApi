export default class LuhnAlgorithm
{
    public static validateCreditCardNumber(number: string): boolean 
    {
        // Eliminar espacios y caracteres no numéricos
        const cleanedNumber = number.toString().replace(/\D/g, '');
      
        if (cleanedNumber.length < 2) {
            return false;
        }
      
        let sum = 0;
        let isEven = false;
      
        for (let i = cleanedNumber.length - 1; i >= 0; i--) {
            const digit = parseInt(cleanedNumber.charAt(i), 10);
            
            if (isNaN(digit)) {
                return false;
            }
            
            if (isEven) {
                let doubledDigit = digit * 2;
                if (doubledDigit > 9) doubledDigit -= 9;
                sum += doubledDigit;
            } else{
                sum += digit;
            }

            isEven = !isEven;
        }
      
        return sum % 10 === 0;
    }
}
