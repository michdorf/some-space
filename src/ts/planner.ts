import { toDate, durata, eventiDaRaw } from './parser'
import { tempoLibero } from "../ts/calendario";
import type {Evento as EventoT} from '../types/calendario'
import giorniStore, { aggEvento } from '../stores/eventi'

interface Planable {
    id: string;
    titolo: string;
    note?: string;
    priorita: number; /* 1 = low 4 = high */
    durata: number; /* i minutes */
    scadenza: Date | undefined;
}

class Planner {
    piani: Planable[] = [];
    giorni: Array<[Date, EventoT[]]> = [];
    tempiLibero: Date[][] = [];

    constructor() {
        giorniStore.subscribe((g) => {
            this.giorni = g;
            this.genTempoLibero();
        });
    }

    fromTodoist(task) {
        let ptask: Planable = {
            id: task.id,
            titolo: task.content,
            priorita: task.priority,
            scadenza: undefined,
            durata: 60
        }
        if (task.due) {
            if (false && 'datetime' in task.due) { // Ignora per primo l'orario
                ptask.scadenza = toDate(task.due.datetime);
            } else if ('date' in task.due) {
                ptask.scadenza = toDate(task.due.date);
            }
        }

        this.agg(ptask);
        this.pianifica(ptask);
    }

    agg(piano: Planable) {
        this.piani.push(piano);
    }

    genTempoLibero() {
        for (let i = 0; i < this.giorni.length; i++) {
            let tempo = tempoLibero(this.giorni[i][0], this.giorni[i][1]);
            let tEventi = tempo.map(v => {
                return {
                    id: crypto.randomUUID(),
                    title: 'Tempo libero',
                    calendar: 'tempo_libero',
                    startDate: v[0],
                    endDate: v[1],
                    lastModified: new Date(0)
                }
            });
            
            this.tempiLibero.push(...tempo);
    
            const INTEGRA_IN_CALENDARIO = false;
            if (INTEGRA_IN_CALENDARIO) {
                this.giorni[i][1] = this.giorni[i][1].concat(tEventi).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
            }
        }
    }

    pianifica(piano: Planable) {
        for (let i = 0; i < this.tempiLibero.length; i++) {
            if (durata(this.tempiLibero[i][0], this.tempiLibero[i][1]) >= piano.durata) {
                aggEvento({
                    id: piano.id,
                    calendar: "tasks",
                    title: piano.titolo,
                    startDate: this.tempiLibero[i][0],
                    endDate: new Date(this.tempiLibero[i][1].getTime() + piano.durata*60000),
                });
                break;
            }
        }
        console.log("Avrebbe pianificato", piano);
    }
}

const P = new Planner();

export default P;