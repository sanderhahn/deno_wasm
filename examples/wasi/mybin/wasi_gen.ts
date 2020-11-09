import Context from "https://deno.land/std/wasi/snapshot_preview1.ts";
const context = new Context({});
const exports = Object.keys(context.exports).map((key) => {
  return `export const ${key} = exports.${key}`;
});

const code = `
import Context from "https://deno.land/std/wasi/snapshot_preview1.ts";
const context = new Context({
  args: ["[PLACEHOLDER]", ...Deno.args],
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
  memory,
}) {
  context.memory = memory;
  if (_start instanceof Function) {
    _start();
  } else {
    throw new Error(
      "No '_start' entry point found in WebAssembly module, make sure to compile with wasm32-wasi as the target.",
    );
  }
}
`;
Deno.writeTextFileSync("./pkg/snapshot_preview1.js", code);

const init = `
import { init } from 'wasi_snapshot_preview1';
init(wasm);
// wasm.__wbindgen_start();
`;

if (Deno.args[0]) {
  const wrapper = Deno.args[0];
  const wasm = Deno.readTextFileSync(wrapper);
  Deno.writeTextFileSync(
    wrapper,
    wasm.replace("wasm.__wbindgen_start();", init),
  );
}
