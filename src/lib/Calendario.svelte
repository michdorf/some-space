<script lang="ts">
import CalendarMock from "../mock/calendar";
import type {Evento, DateString} from '../types/calendario'

  let endDate = new Date();
  let startDate = new Date(2022,endDate.getMonth()-2);

  let Calendario;
  if (('plugins' in window) && ('calendar' in (window as any).plugins)) {
    Calendario = (window as any).plugins.calendar;
  } else {
    Calendario = CalendarMock;
  }

  let success = function(message) { alert("Success: " + JSON.stringify(message)); };
  let error = function(message) { alert("Error: " + message); };

  function toDate(str: DateString) {
    let m = str.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):\d{2}/).map((v) => parseInt(v));
    return new Date(m[1], m[2]-1, m[3], m[4], m[5]);
  }

  let eventi: Array<Evento> = [];
  $: intervalli = eventi.map((valore) => [
    typeof valore.startDate,
    /* new Date(valore.endDate).getTime() - new Date(valore.startDate).getTime() */ ]);

  // list all events in a date range (only supported on Android for now)
  //Calendario.listEventsInRange(startDate,endDate,success,error);

  // list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..]
  Calendario.listCalendars((calendari) => {
    // find all _future_ events in the first calendar with the specified name (iOS only for now, this includes a list of attendees (if any))
    console.log("calendari", calendari);
    for (let i = 0; i < calendari.length; i++) {
        Calendario.findAllEventsInNamedCalendar(calendari[i].name,(evi: Evento[]) => {
            eventi = [...eventi, ...evi];
            console.log(toDate(evi[0].startDate))
        },error);
    }
  },error);

</script>

<h2>Start calendario</h2>
{#each eventi as evento}
    <b>{evento.title}</b><br>
    <i>{evento.startDate}</i><br>
{/each}
<br>
{intervalli[0]}
