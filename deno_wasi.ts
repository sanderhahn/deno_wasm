import { hello_world, hello_world_js, process_js, args, envs } from "./wasi/deno_wasm.js";

console.log(args());
console.log(envs());
console.log(hello_world());
console.log(hello_world_js());

process_js("test.txt", "copy.txt");
