# wasi + wasm-bingen

This is a copy of `wasi/mybin` but the main program is empty (but still has to run for initialization).
The method that runs is exposed using `wasm-bindgen` and invoked in the script.
Because of the `wasm-bindgen` bindings, the generated wasm binary is incompatible with `wasmtime`.
