<script lang="ts">
import Giorno from "./Giorno.svelte"
import giorni from '../stores/eventi'

// list all calendar names - returns this JS Object to the success callback: [{"id":"1", "name":"first"}, ..]
/* Calendario.listCalendars((calendari: CalendarioT[]) => {
  // find all _future_ events in the first calendar with the specified name (iOS only for now, this includes a list of attendees (if any))
  console.log("calendari", calendari);
  for (let i = 0; i < calendari.length; i++) {
      Calendario.findAllEventsInNamedCalendar(calendari[i].id,(evi: EventoRaw[]) => {
          eventi = [...eventi, ...eventiDaRaw(evi)];
          console.log("Step eventi:",eventiDaRaw(evi));
      },error);
  }
},error); */

</script>

<h2>Start calendario</h2>
{#each $giorni as giorno}
  <Giorno data={giorno[0]} eventi={giorno[1]}></Giorno>
{/each}

