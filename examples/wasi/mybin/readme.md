# wasi

Generate a bin crate `cargo new mybin`, the example program is from the wasmtime [WASI tutorial](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md). The programs takes copies a file based upon its arguments. The steps are part of the `makefile`:

## make setup

Install the wasi target `rustup target add wasm32-wasi`.

## make build

Compile with the wasi target: `cargo build --target wasm32-wasi`.

Generate bindings using `wasm-bindgen --target deno --out-dir pkg ./target/wasm32-wasi/debug/mybin.wasm`.

The generated bindings use import `wasi_snapshot_preview1` which we can override using [`importmap.json`](https://deno.land/manual/linking_to_external_code/import_maps).

However the Deno wasi implementation needs a wrapper to make the generated bindings work. Also the generated code needs
some adjustments, that code generation logic is part of `wasi_gen.ts`.

## make run

See that the `hello.txt` file is copied to `copy.txt`.

## make wasmtime

Run the same binary using `wasmtime`.

## References

- [wasmtime](https://wasmtime.dev/)
- [https://bytecodealliance.github.io/cargo-wasi/](https://bytecodealliance.github.io/cargo-wasi/cli-usage.html)
