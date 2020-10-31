# deno wasm

Generate a lib crate `cargo new --lib deno_wasm`.

`src/lib.rs`

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hello_world() -> String {
  "Hello World!".to_string()
}
```

`Cargo.toml`

```toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.68"
js-sys = "0.3.45"
```

`deno.ts`

```ts
import { hello_world } from "./pkg/deno_wasm.js";

console.log(hello_world());
```

Install `wasm-bindgen-cli` the version must match the dependency version in the `Cargo.toml`.

```bash
rustup target add wasm32-unknown-unknown

cargo install wasm-bindgen-cli --version 0.2.68
# Installed package `wasm-bindgen-cli v0.2.68` (executables `wasm-bindgen`, `wasm-bindgen-test-runner`, `wasm2es6js`)

cargo build --target wasm32-unknown-unknown

wasm-bindgen --target deno --out-dir pkg ./target/wasm32-unknown-unknown/debug/deno_wasm.wasm

deno run --allow-read deno.ts
```

Cargo test must use special target and the `wasm-bindgen-test-runner` (see makefile):

```rust
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_hello_world() {
    assert_eq!(hello_world(), "Hello World!".to_string());
}
```

Deno target `wasm-pack` is being developed:

- Pull request for that adds target for Deno: (#908)[https://github.com/rustwasm/wasm-pack/pull/908]
- Wasm-pack runs `wasm-opt` which can't seem to handle returning a `String`s directly.
- The `wasm-pack` test subcommands is missing a target for Deno.

```bash
# wasm-pack version with --target deno support
cargo install --git https://github.com/juzi5201314/wasm-pack

wasm-pack build --target deno
```

Cargo wasi uses a `wasm32-wasi` target:

```bash
cargo install cargo-wasi
rustup target add wasm32-wasi
```

## References

- [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [https://bytecodealliance.github.io/cargo-wasi/](https://bytecodealliance.github.io/cargo-wasi/cli-usage.html)
- [wasmtime WASI-tutorial](https://github.com/bytecodealliance/wasmtime/blob/main/docs/WASI-tutorial.md)
- [Deno WebAssembly](https://deno.land/manual/getting_started/webassembly)
- [Deno wasi](https://deno.land/std@0.76.0/wasi/README.md)
