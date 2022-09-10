<script lang="ts">
import CalendarMock from "../mock/calendar";
import type {Evento as EventoT, EventoRaw, DateString} from '../types/calendario'
import Giorno from "./Giorno.svelte"
import Intervallo from '../../moduli/intervallo'

  let startDate = new Date(2022,8,7);
  let endDate = new Date(2022,startDate.getMonth(),startDate.getDate() + 14);

  let Calendario;
  if (('plugins' in window) && ('calendar' in (window as any).plugins)) {
    Calendario = (window as any).plugins.calendar;
  } else {
    Calendario = CalendarMock;
  }

  let error = function(message) { alert("Error: " + message); };

  function toDate(str: DateString): Date {
    let m = str.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):\d{2}/).map((v) => parseInt(v));
    return new Date(m[1], m[2]-1, m[3], m[4], m[5]);
  }
  function eventiDaRaw(eventi: EventoRaw[]): EventoT[] {
    return eventi.map((e) => Object.assign(e, {
      startDate: toDate(e.startDate),
      endDate: toDate(e.endDate),
      lastModified: toDate(e.lastModified)
    }));
  }

  function giornoIntervallo(d: Date): Intervallo {
    let start = new Date(d.getTime()), end = new Date(d.getTime());
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    return new Intervallo(start.getTime(), end.getTime());
  }
  function interAData(inter: Intervallo[]): Date[][] {
    return inter.map(v => [new Date(v.inizio), new Date(v.fine)]);
  }

  function eventoIntervallo(evento: EventoT): Intervallo {
    return new Intervallo(evento.startDate.getTime(), evento.endDate.getTime());
  }

  function spazioLibero(data: Date) {
    // debugger;
    let giornoIntero = giornoIntervallo(data);
    let giorno = giorni.filter(v => v[0].getTime() === giornoIntero.inizio)[0];
    let spazi: Intervallo[] = [];
    let eventi = giorno[1];
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
      spazi.push(...giornoInter);
    }

    console.log('Intervalli', interAData(giornoInter))
  }

  let eventi: Array<EventoT> = [];
  let giorni: Array<[Date, EventoT[]]> = [];
  $: {
    let dAtt = startDate;
    let giornoAtt: Intervallo = giornoIntervallo(dAtt);
    giorni = [];
    let giorniTotale = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
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
  }
  /**
   * durate Array di durate in secondi
   */
  $: durate = eventi.map((valore) => 
    Math.round((new Date(valore.endDate).getTime() - new Date(valore.startDate).getTime())/1000)
  );

  // list all events in a date range (only supported on Android for now)
  //Calendario.listEventsInRange(startDate,endDate,success,error);

  // list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..]
  Calendario.listCalendars((calendari) => {
    // find all _future_ events in the first calendar with the specified name (iOS only for now, this includes a list of attendees (if any))
    console.log("calendari", calendari);
    for (let i = 0; i < calendari.length; i++) {
        Calendario.findAllEventsInNamedCalendar(calendari[i].name,(evi: EventoRaw[]) => {
            eventi = [...eventi, ...eventiDaRaw(evi)];
            console.log("Eventi", evi);
        },error);
    }
  },error);

</script>

<h2>Start calendario</h2>
{#each giorni as giorno}
  <button on:click={() => spazioLibero(giorno[0])}>Check</button>
  <Giorno data={giorno[0]} eventi={giorno[1]}></Giorno>
{/each}

