# wasi + wasm-bingen

This is a copy of `wasi/mybin` but the main program is empty (but still has to run for initialization).
The method that copies the files is exposed using `wasm-bindgen` and invoked in the script.
Because of the `wasm-bindgen` bindings, the generated wasm binary is incompatible with `wasmtime`.

## make run

The `myscript.ts` now imports the `process` function from the wasm and invokes it.

## References

- [Adding experimental WebAssembly support to Decaton](https://engineering.linecorp.com/en/blog/adding-experimental-webassembly-support-to-decaton-part-1/) (shows `_initialize` that calls `wasi::fd_prestat_get`, `wasi::fd_prestat_dir_name` and `libc::__wasilibc_register_preopened_fd`)
- [__wasilibc_register_preopened_fd](https://github.com/WebAssembly/wasi-libc/blob/84c0778bff35bca3b5fa7814a3e1f3fb36362af6/libc-bottom-half/sources/preopens.c#L111)
- [internal_register_preopened_fd](https://github.com/WebAssembly/wasi-libc/blob/84c0778bff35bca3b5fa7814a3e1f3fb36362af6/libc-bottom-half/sources/preopens.c#L77)
