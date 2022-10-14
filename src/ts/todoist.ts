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

    const loop = function (i: number) {
        if (i >= activeProjs.length){
            tasks.set(tt);
            return;
        }

        api.getTasks({ projectId: activeProjs[i]})
            .then((taskAr) => {
                tt = [...tt, ...taskAr]
                loop(++i);
            })
            .catch((error) => console.log(error))
    }

    loop(0);
}

export { tasks };
export default api;