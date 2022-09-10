export type DateString = `${number}-${number}-${number} ${number}:${number}:${number}`;
interface EventoBase {
    id: string; /* uuid */
    title: string;
    startDate: DateString | Date;
    endDate: DateString | Date;
    calendar: string;
    lastModified: DateString | Date;
}
export interface EventoRaw extends EventoBase {
    startDate: DateString;
    endDate: DateString;
    lastModified: DateString;
}
export interface Evento extends EventoBase {
    startDate: Date;
    endDate: Date;
    lastModified: Date;
}
export interface Calendario {
    id: string;
    name: string;
    type: 'Local' | 'Mail' | 'Birthday'
}