import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
const context = new Context({});
const exports = Object.keys(context.exports).map((key) => {
  return `export const ${key} = exports.${key}`;
});
const code = `
import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
console.log("Deno.args", Deno.args);
console.log("Deno.env", Deno.env.toObject());
const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
  memory: new WebAssembly.Memory({ initial: 65536, maximum: 65536}),
  preopens: ["."],
});
const exports = context.exports;
${exports.join(";\n")};
`;
await Deno.writeTextFile("snapshot_preview1.js", code);
