import { hello_world, hello_world_js, process_js } from "./wasi/deno_wasm.js";

console.log(hello_world());
console.log(hello_world_js());
process_js("test.txt", "copy.txt");
