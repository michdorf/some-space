<script lang="ts">
import CalendarMock from "../mock/calendar";
import type {Evento as EventoT, EventoRaw, DateString, OldDateString} from '../types/calendario'
import Giorno from "./Giorno.svelte"
import type Intervallo from "moduli/intervallo";
import {giornoIntervallo, eventoIntervallo} from '../ts/calendario'

  let startDate = new Date(2022,8,7);
  let endDate = new Date(2022,startDate.getMonth(),startDate.getDate() + 14);

  let Calendario;
  if (('plugins' in window) && ('calendar' in (window as any).plugins)) {
    Calendario = (window as any).plugins.calendar;
  } else {
    Calendario = CalendarMock;
  }

  let error = function(message) { alert("Error: " + message); };

  function toDate(str: DateString | OldDateString): Date {
    let m = str.match(/(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):\d{2}/).map((v) => parseInt(v));
    return new Date(m[1], m[2]-1, m[3], m[4], m[5]);
  }
  function eventiDaRaw(eventi: EventoRaw[]): EventoT[] {
    return eventi.map((e) => {
      let t: {startDate: Date, endDate: Date, lastModified?: Date} = {
        startDate: toDate(e.startDate),
        endDate: toDate(e.endDate),
      };
      if ('lastModified' in e) {
        t.lastModified = toDate(e.lastModified)
      }
      return Object.assign(e, t);
    });
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
  <Giorno data={giorno[0]} eventi={giorno[1]}></Giorno>
{/each}

