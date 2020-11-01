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
export function init(memory) {
  console.log("using memory", memory);
  context.memory = memory;
}
`;
await Deno.writeTextFile("snapshot_preview1.js", code);

const wasm = Deno.openSync("./wasi/deno_wasm.js", {append: true, write: true});
const encoder = new TextEncoder();
const suffix = `
import { init } from 'wasi_snapshot_preview1';
init(wasm.memory);
`;
Deno.writeSync(wasm.rid, encoder.encode(suffix));
