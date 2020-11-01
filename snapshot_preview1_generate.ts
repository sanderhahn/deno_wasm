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
  memory: new WebAssembly.Memory({ initial: 10, maximum: 100 }),
});
const exports = context.exports;
${exports.join(";\n")};
`;
await Deno.writeTextFile("snapshot_preview1.js", code);
