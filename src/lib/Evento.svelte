<script lang="ts">
    import type { Evento } from "../types/calendario";
    export let evento: Evento;
 
    function oriario(evento: Evento): string {
       return `${evento.startDate.getHours()}:${evento.startDate.getMinutes()} - ${evento.endDate.getHours()}:${evento.endDate.getMinutes()}`;
    }
</script>

<div class="evento">
    <p class="titolo">{evento.title} (<i>{evento.startDate.toLocaleDateString()} 
        {#if evento.startDate.getDate() !== evento.endDate.getDate()}
          - {evento.endDate.toLocaleDateString()}
        {/if}
    </i>)</p>
    <p class="orario">{oriario(evento)}</p>
    <p class="calendario">{evento.calendar}</p>
  </div>

  <style>
    .evento p {
      margin: 0;
    }
    .evento {
      background-color: rgb(62, 143, 255);
      border: 1px solid blue;
      color: rgb(0, 0, 152);
      margin-top: 0.8rem;
      padding: 8px;
      text-align: left;
    }
    .evento .calendario {
      text-align: right;
      font-size: 0.8rem;
    }
  </style>