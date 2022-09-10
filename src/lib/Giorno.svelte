<script lang="ts">
    import type { Evento as EventoT } from "../types/calendario";
    import Evento from "./Evento.svelte";

    export let eventi: EventoT[];
    export let data: Date;
</script>

<div class="data">{data.toLocaleDateString()}</div>
{#if eventi.length < 1}
  <p style="font-style: italic;">Ingen begivenheder</p>
{/if}
{#each eventi as evento}
  <Evento evento={evento}></Evento>
{/each}

<style>
  .data {
    font-weight: bold;
  }
</style>