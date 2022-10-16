<script lang="ts">
    import {tasks} from '../../ts/todoist'
    import planner from '../../ts/planner'

    /* $: {
        console.log("start planning");
        for (let i = 0; i < $tasks.length; i++) {
            console.log("plans",$tasks[i]);
            planner.fromTodoist($tasks[i]);
        }
    } */

    function pianifica(task) {
        console.log("plans",task);
        planner.fromTodoist(task);
    }

    function testpianifica() {
        debugger;
        pianifica({
            id: '',
            content: '',
            priority: 2,
            due: {
                date: '2022-10-17'
            }
        });
    }
</script>

<button on:click={() => testpianifica()}>Test pianificazione</button>

{#each $tasks as task}
    !!{task.priority} {task.content} ({JSON.stringify(task.due)}) <button on:click={() => pianifica(task)}>Pianifica</button><br>
{/each}