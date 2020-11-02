import { process } from "./pkg/mybin.js";

if (Deno.args.length < 2) {
  console.error("usage: <input_file> <output_file>");
  Deno.exit(1);
}

const result = process(Deno.args[0], Deno.args[1]);
if (result !== undefined) {
  console.log(result);
}
