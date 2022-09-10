export type DateString = `${number}-${number}-${number} ${number}:${number}:${number}`;
export interface Evento {
    id: string; /* uuid */
    title: string;
    startDate: DateString;
    endDate: DateString;
    calendar: string;
    lastModified: DateString;
}
export interface Calendario {
    id: string;
    name: string;
    type: 'Local' | 'Mail' | 'Birthday'
}