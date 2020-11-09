import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

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
    assertEquals(Deno.args, ["hello.txt", "copy.txt"]);
    await removeIfExists("copy.txt");
    await import("./pkg/mybin.js");
    const copy = await Deno.readTextFile("copy.txt");
    assertEquals(copy, "Hello world\n");
  },
);
