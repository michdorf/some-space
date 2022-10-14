import { TodoistApi } from '@doist/todoist-api-typescript'
import impostazioni from '../stores/todoist';
import { writable } from 'svelte/store';

const api = new TodoistApi(import.meta.env.VITE_TODOIST_API_TOKEN);

const tasks = writable([]);
let activeProjs = [];
impostazioni.subscribe((v) => {
    activeProjs = v.active;
});
export function fetchTasks() {
    let tt = [];
    for (let i = 0; i < activeProjs.length; i++) {
        api.getTasks({ projectId: activeProjs[i]})
            .then((tasks) => tt.push(tasks))
            .catch((error) => console.log(error))
    }

    tasks.set(tt);
}

export default tasks;