import type { Evento as EventoT, EventoRaw, DateString, OldDateString } from '../types/calendario'

/**
 * Returnerer varighed i minutter
 * @param inizio 
 * @param fine 
 * @returns varighed i minutter
 */
export function durata(inizio: Date, fine: Date) {
    return Math.round((fine.getTime() - inizio.getTime())/(1000*60))
}

export function toDate(str: DateString | OldDateString): Date {
    if (typeof str === "object") {
        if ('getTime' in (<any>str)) {
            return str;
        } else {
            console.error("str not valid date");
        }
    }
    let m = str.match(/(\d{4})-(\d{2})-(\d{2})([ T](\d{2}):(\d{2}):\d{2})?/).map((v) => parseInt(v));
    return new Date(m[1], m[2] - 1, m[3], m[5] || 0, m[6] || 0);
}

export function eventiDaRaw(eventi: EventoRaw[]): EventoT[] {
    return eventi.map((e) => {
        // console.log(`'undef?: ${e.startDate}' '${e.endDate}' '${e.lastModified}'`);
        let t: { startDate: Date, endDate: Date, lastModified?: Date } = {
            startDate: toDate(e.startDate),
            endDate: toDate(e.endDate),
        };
        if ('lastModified' in e) {
            t.lastModified = toDate(e.lastModified)
        }
        return Object.assign(e, t);
    });
}