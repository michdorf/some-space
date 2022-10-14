<script lang="ts">
    import {tasks} from '../../ts/todoist'
    import planner from '../../ts/planner'

    $: {
        for (let i = 0; i < $tasks.length; i++) {
            planner.fromTodoist($tasks[i]);
        }
    }
</script>

{#each $tasks as task}
    !!{task.priority} {task.content} ({JSON.stringify(task.due)})<br>
{/each}