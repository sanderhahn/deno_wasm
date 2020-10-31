import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
});
export default context;
