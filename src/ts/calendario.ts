import type Orari from 'src/types/orari';
import Intervallo from '../../moduli/intervallo'
import type {Evento} from '../types/calendario'

function interAData(inter: Intervallo[]): Date[][] {
    return inter.map(v => [new Date(v.inizio), new Date(v.fine)]);
  }

export function eventoIntervallo(evento: Evento): Intervallo {
    if (typeof evento.startDate !== "object" || typeof evento.endDate !== "object") {
      console.warn("Non evento intervallo",evento);
    }
    return new Intervallo(evento.startDate.getTime(), evento.endDate.getTime());
  }
  
export function giornoIntervallo(d: Date): Intervallo {
    let start = new Date(d.getTime()), end = new Date(d.getTime());
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    return new Intervallo(start.getTime(), end.getTime());
  }

export function tempoLibero(data, eventi: Evento[], orariDiLavoro?: Orari): Date[][] {
    let giornoIntero = giornoIntervallo(data);
    let giornoInter = [];
    for (let i = 0; i < eventi.length; i++) {
      let giornus = [];
      for (let j = 0; j < giornoInter.length; j++) {
        let tmp: Intervallo[] = Intervallo.sottratti(giornoInter[j], eventoIntervallo(eventi[i]));
        giornus.push(...tmp);
      }
      giornoInter = giornus;

      if (giornoInter.length === 0) {
        giornoInter = Intervallo.sottratti(giornoIntero, eventoIntervallo(eventi[i]));
      }
    }

    if (eventi.length === 0) {
      giornoInter = [giornoIntero];
    }

    return interAData(giornoInter);
  }