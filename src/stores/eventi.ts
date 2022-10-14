import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import CalendarMock from "../mock/calendar";
import type {CalendarioPlugin} from "../mock/calendar";
import type {Evento as EventoT, Calendario as CalendarioT, EventoRaw, DateString, OldDateString} from '../types/calendario'
import type Intervallo from "moduli/intervallo";
import {giornoIntervallo, eventoIntervallo} from '../ts/calendario'
import { eventiDaRaw } from '../ts/parser'

let Calendario: CalendarioPlugin;
if (('plugins' in window) && ('calendar' in (window as any).plugins)) {
  Calendario = (window as any).plugins.calendar;
} else {
  Calendario = CalendarMock;
}

const oggi_d = new Date();
let dataInizio = () => new Date(oggi_d.getFullYear(),oggi_d.getMonth(),oggi_d.getDate());
let dataFine = () => new Date(2022,dataInizio().getMonth(),dataInizio().getDate() + 14);

let error = function(message) { alert("Error: " + message); };

let eventi: Array<EventoT> = [];

// list all events in a date range (only supported on Android for now)
//Calendario.listEventsInRange(startDate,endDate,success,error);

Calendario.findEvent('','','',dataInizio(),dataFine(),(even: EventoRaw[]) => {
  eventi = [...eventi, ...eventiDaRaw(even)];
  aggEventi(eventi);
  console.log("Step eventi:",eventiDaRaw(even));
},error);

let giorniStore: Writable<Array<[Date, EventoT[]]>> = writable([]);

let giorni: Array<[Date, EventoT[]]> = [];
export function aggEventi(eventi: Array<EventoT>) {
  let dAtt = dataInizio();
  let giornoAtt: Intervallo = giornoIntervallo(dAtt);
  giorni = [];
  let giorniTotale = Math.ceil((dataFine().getTime() - dataInizio().getTime()) / (1000 * 60 * 60 * 24));
  for (let i = 0; i < giorniTotale; i++) {
    let eventiDelGiorno = [];
    for (let j = 0; j < eventi.length; j++) {
      if (giornoAtt.sovraponne(eventoIntervallo(eventi[j]))) {
        eventiDelGiorno.push(eventi[j]);
      }
    }
    giorni.push([new Date(giornoAtt.inizio), eventiDelGiorno]);

    dAtt.setDate(dAtt.getDate() + 1);
    giornoAtt = giornoIntervallo(dAtt);
  }

  giorniStore.set(giorni);
}

export function aggEvento(evento: EventoT) {
    // Check evt. om evento.id allerede eksisterer
    aggEventi([evento]);
}

export default giorniStore;