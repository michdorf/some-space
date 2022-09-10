<script lang="ts">
import { tempoLibero } from "../ts/calendario";

    import type { Evento as EventoT } from "../types/calendario";
    import Evento from "./Evento.svelte";
import TempoLibero from "./TempoLibero.svelte";

    export let eventi: EventoT[];
    export let data: Date;

    let tempo = tempoLibero(data, eventi);
    let tEventi: EventoT[] = tempo.map(v => {
      return {
        id: crypto.randomUUID(),
        title: 'Tempo libero',
        calendar: 'tempo_libero',
        startDate: v[0],
        endDate: v[1],
        lastModified: new Date(0)
      }
    });

    let eventiUniti = [...eventi, ...tEventi].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
</script>

<div class="data">{data.toLocaleDateString()}</div>
{#if eventi.length < 1}
  <p style="font-style: italic;">Ingen begivenheder</p>
{/if}
{#each eventiUniti as evento}
  {#if evento.calendar === 'tempo_libero'}
  <TempoLibero evento={evento}></TempoLibero>
  {:else}
  <Evento evento={evento}></Evento>
  {/if}
{/each}

<style>
  .data {
    font-weight: bold;
  }
</style>