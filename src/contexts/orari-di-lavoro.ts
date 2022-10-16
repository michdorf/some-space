import Orari from "src/types/orari";
import { setContext } from "svelte";

setContext('orari-di-lavoro', new Orari('9:00', '16:00'));
setContext('giorni-di-lavoro', [1,2,3,4,5]); // 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on