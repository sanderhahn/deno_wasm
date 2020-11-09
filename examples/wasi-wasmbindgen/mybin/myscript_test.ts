import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { process } from "./pkg/mybin.js";

async function removeIfExists(filename: string) {
  try {
    await Deno.remove(filename);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return;
    }
    throw err;
  }
}

Deno.test(
  "process",
  async () => {
    await removeIfExists("copy.txt");
    process("hello.txt", "copy.txt");
    const copy = await Deno.readTextFile("copy.txt");
    assertEquals(copy, "Hello world\n");
  },
);
