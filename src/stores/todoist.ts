import { writable } from 'svelte/store'

export const storageKey = 'todoist-imposz';

let data = {
    projects: [],
    active: []
};
const saved = localStorage.getItem(storageKey);
if (saved) {
    data.active = JSON.parse(saved);
}

let _data;
const TodoistImpostazioni = writable(data);
TodoistImpostazioni.subscribe((v) => {
    _data = v;
});

export function isActive(projId: `${number}`) {
    return _data.active.indexOf(projId) !== -1;
}

export default TodoistImpostazioni