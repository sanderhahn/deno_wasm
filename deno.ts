import { hello_world, hello_world_js, process_js } from "./pkg/deno_wasm.js";

console.log(hello_world());
console.log(hello_world_js());
process_js("test.txt", "copy.txt");
