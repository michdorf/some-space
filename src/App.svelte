<script lang="ts">
  import Calendario from './lib/Calendario.svelte';
  import SvelteImpostazioni from './lib/todoist/Impostazioni.svelte'
  import tasks from './ts/todoist'
</script>

<main>
  <h1>Vite + Svelte</h1>
  <SvelteImpostazioni />

  {$tasks}

  <Calendario></Calendario>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .read-the-docs {
    color: #888;
  }
</style>