import * as moment from 'moment-timezone';
import { SimpleObjectInterface } from '../interfaces/simpleObject';

export class DateService {
    /**
     * Получить объект временной зоны
     */
    static getTimeZoneObject(timeZoneId: string): SimpleObjectInterface | null {
        let timeZoneObj = timeZoneId
            ? {
                value: timeZoneId,
                name: `(UTC${moment.tz(timeZoneId)
                      .format('Z')}) ${moment
                      .tz(timeZoneId)
                      .tz()}`,
            }
            : null;
        return timeZoneObj;
    }

    /**
     * Получить список часовых поясов
     */
    static getTimezoneList(searchString: string): any[] {
        return moment.tz
            .names()
            .filter((item: string) => item.indexOf(searchString) > -1)
            .map((item: any) => DateService.getTimeZoneObject(item))
            .sort((a: SimpleObjectInterface, b: SimpleObjectInterface) => {
                return (
                    moment.tz(a.value)
                        .utcOffset() -
                    moment.tz(b.value)
                        .utcOffset()
                );
            });
    }
}
