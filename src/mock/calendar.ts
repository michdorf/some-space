import type { Calendario, EventoRaw } from "../types/calendario";

type ErrorFunz = (message: string) => unknown;

class CalendarMock {
    listCalendars(callback: (calendari: Calendario[]) => void, error: ErrorFunz) {
        let calendari: Calendario[];
        calendari = [
            {
                id: crypto.randomUUID(),
                name: 'Test calendar 1',
                type: 'Local'
            }/* ,
            {
                id: crypto.randomUUID(),
                name: 'Test calendar 2',
                type: 'Mail'
            } */
        ];

        if (typeof callback == 'function') {callback(calendari);}
    }

    findAllEventsInNamedCalendar(calendarName: string, callback: (evi: EventoRaw[]) => void, error: ErrorFunz) {
        let eventi: EventoRaw[];
        eventi = [
            {
                id: crypto.randomUUID(),
                title: 'Først event',
                calendar: calendarName,
                startDate: '2022-09-08 09:00:00',
                endDate: '2022-09-08 10:30:00',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event over 2 dage',
                calendar: calendarName,
                startDate: '2022-09-08 11:00:00',
                endDate: '2022-09-09 12:00:00',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'En titel 1',
                calendar: calendarName,
                startDate: '2022-09-10 09:00:00',
                endDate: '2022-09-10 10:30:00',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event 2',
                calendar: calendarName,
                startDate: '2022-09-10 11:00:00',
                endDate: '2022-09-10 12:00:00',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Et simpelt event',
                calendar: calendarName,
                startDate: '2022-09-12 09:00:00',
                endDate: '2022-09-12 10:30:00',
                lastModified: '2022-09-08 09:00:00'
            }
        ];

        if (typeof callback == 'function') {callback(eventi);}
    }
}

export default new CalendarMock()