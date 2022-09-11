import type { Calendario, EventoRaw } from "../types/calendario";

type ErrorFunz = (message: string) => unknown;

class CalendarMock {
    calendari: Calendario[] = [
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

    listCalendars(callback: (calendari: Calendario[]) => void, error: ErrorFunz) {
        if (typeof callback == 'function') { callback(this.calendari); }
    }

    findEvent(title: string,eventLocation: string,notes: string,startDate: Date,endDate: Date,callback: (evi: EventoRaw[]) => void,error: ErrorFunz) {
        let eventi: EventoRaw[];
        eventi = [
            {
                id: crypto.randomUUID(),
                title: 'Først event',
                calendar: 'calendar 1',
                startDate: '2022-09-08T09:00:00.000Z',
                endDate: '2022-09-08T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event over 2 dage',
                calendar: 'calendar 1',
                startDate: '2022-09-08T11:00:00.000Z',
                endDate: '2022-09-09T12:00:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'En titel 1',
                calendar: 'calendar 1',
                startDate: '2022-09-10T09:00:00.000Z',
                endDate: '2022-09-10T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event 2',
                calendar: 'calendar 1',
                startDate: '2022-09-10T11:00:00.000Z',
                endDate: '2022-09-10T12:00:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Et simpelt event',
                calendar: 'calendar 1',
                startDate: '2022-09-12T09:00:00.000Z',
                endDate: '2022-09-12T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            }
        ];

        if (typeof callback == 'function') { callback(eventi); }

    }

    /**
     * Obs. only future events on iOS
     * @param calendarId 
     * @param callback 
     * @param error 
     */
    findAllEventsInNamedCalendar(calendarId: string, callback: (evi: EventoRaw[]) => void, error: ErrorFunz) {
        let eventi: EventoRaw[];
        let calendarName = this.calendari.filter(c => c.id === calendarId)[0].name;
        eventi = [
            {
                id: crypto.randomUUID(),
                title: 'Først event',
                calendar: calendarName,
                startDate: '2022-09-08T09:00:00.000Z',
                endDate: '2022-09-08T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event over 2 dage',
                calendar: calendarName,
                startDate: '2022-09-08T11:00:00.000Z',
                endDate: '2022-09-09T12:00:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'En titel 1',
                calendar: calendarName,
                startDate: '2022-09-10T09:00:00.000Z',
                endDate: '2022-09-10T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Event 2',
                calendar: calendarName,
                startDate: '2022-09-10T11:00:00.000Z',
                endDate: '2022-09-10T12:00:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            },
            {
                id: crypto.randomUUID(),
                title: 'Et simpelt event',
                calendar: calendarName,
                startDate: '2022-09-12T09:00:00.000Z',
                endDate: '2022-09-12T10:30:00.000Z',
                lastModified: '2022-09-08 09:00:00'
            }
        ];

        if (typeof callback == 'function') { callback(eventi); }
    }
}

export default new CalendarMock()