<script lang="ts">
import todoist, {fetchTasks} from '../../ts/todoist'
import impostazioni, { storageKey, isActive } from '../../stores/todoist'

todoist.getProjects()
    .then((projects) => impostazioni.update((v) => { v.projects = projects; return v; }))
    .catch((error) => console.log(error))

function toggleProject(projId: `${number}`) {
    impostazioni.update((v) => {
        if (v.active.indexOf(projId) !== -1) {
            v.active = v.active.filter((ac) => ac !== projId);
        } else {
            v.active = [...v.active, projId];
        }

        localStorage.setItem(storageKey, JSON.stringify(v.active));
        return v;
    })
}
</script>

<div>
    {#each $impostazioni.projects as project}
        <input id={'proj' + project.id} type="checkbox" on:click={() => toggleProject(project.id)} checked={isActive(project.id)}/><label for={'proj' + project.id}>{project.name}</label>
        &nbsp;
    {/each}

    <button on:click={fetchTasks}>Update tasks</button>
</div>