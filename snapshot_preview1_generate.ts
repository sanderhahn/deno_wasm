import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
const context = new Context({});
const exports = Object.keys(context.exports).map((key) => {
  return `export const ${key} = exports.${key}`;
});
const code = `
import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
  memory: new WebAssembly.Memory({ initial: 10 }),
  preopens: {
    ".": ".",
  },
});
const exports = context.exports;
${exports.join(";\n")};
export function init({
  _start,
  _initialize,
  memory,
}) {
  console.log("using memory", memory);
  context.memory = memory;
  if (_start instanceof Function) {
    _start();
    console.log("_start");
  } else if (_initialize instanceof Function) {
    _initialize();
    console.log("_initialize");
  } else {
    throw new Error(
      "No '_start' or '_initialize' entry point found in WebAssembly module, make sure to compile with wasm32-wasi as the target.",
    );
  }
}
`;
await Deno.writeTextFile("snapshot_preview1.js", code);

const wasm = Deno.openSync("./wasi/deno_wasm.js", {append: true, write: true});
const encoder = new TextEncoder();
const suffix = `
import { init } from 'wasi_snapshot_preview1';
init(wasm);
`;
Deno.writeSync(wasm.rid, encoder.encode(suffix));
