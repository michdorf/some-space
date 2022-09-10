import type { Calendario, Evento } from "../types/calendario";

type ErrorFunz = (message: string) => unknown;

class CalendarMock {
    listCalendars(callback: (calendari: Calendario[]) => void, error: ErrorFunz) {
        let calendari: Calendario[];
        calendari = [
            {
                id: crypto.randomUUID(),
                name: 'Test calendar 1',
                type: 'Local'
            },
            {
                id: crypto.randomUUID(),
                name: 'Test calendar 2',
                type: 'Mail'
            }
        ];

        if (typeof callback == 'function') {callback(calendari);}
    }

    findAllEventsInNamedCalendar(calendarName: string, callback: (evi: Evento[]) => void, error: ErrorFunz) {
        let eventi: Evento[];
        eventi = [
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
                title: 'En titel 2',
                calendar: calendarName,
                startDate: '2022-09-10 11:00:00',
                endDate: '2022-09-10 12:00:00',
                lastModified: '2022-09-08 09:00:00'
            }
        ];

        if (typeof callback == 'function') {callback(eventi);}
    }
}

export default new CalendarMock()