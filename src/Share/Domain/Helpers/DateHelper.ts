export class DateHelper {
    static addminutes(date: Date, minutes: number): Date {
        const time = date.getTime();
        const futureTime = time + minutes * 60 * 1000;
        const futureDate = new Date();
        futureDate.setTime(futureTime);
        return futureDate;
    }
}
