import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { helloWorld } from "./pkg/mylib.js";

Deno.test(
  "helloWorld",
  () => {
    assertEquals(helloWorld(), "Hello World!");
  },
);
