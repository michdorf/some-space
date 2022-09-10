export type DateString = `${number}-${number}-${number}T${number}:${number}:${number}.000Z`;
export type OldDateString = `${number}-${number}-${number} ${number}:${number}:${number}`;

interface EventoBase {
    id: string; /* uuid */
    title: string;
    startDate: DateString | Date;
    endDate: DateString | Date;
    calendar: string;
    lastModified?: OldDateString | Date;
}
export interface EventoRaw extends EventoBase {
    startDate: DateString;
    endDate: DateString;
    lastModified?: OldDateString;
}
export interface Evento extends EventoBase {
    startDate: Date;
    endDate: Date;
    lastModified?: Date;
}
export interface Calendario {
    id: string;
    name: string;
    type: 'Local' | 'Mail' | 'Birthday'
}