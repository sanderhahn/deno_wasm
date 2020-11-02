# wasm-bindgen

Generate a lib crate `cargo new --lib mylib`.

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

[dev-dependencies]
wasm-bindgen-test = "0.3.18"
```

`myscript.ts`

```ts
import { hello_world } from "./pkg/mylib.js";

console.log(hello_world());
```

Install `wasm-bindgen-cli` the version must match the dependency version in the `Cargo.toml`.

## make setup

```bash
rustup target add wasm32-unknown-unknown

cargo install wasm-bindgen-cli --version 0.2.68
# Installed package `wasm-bindgen-cli v0.2.68` (executables `wasm-bindgen`, `wasm-bindgen-test-runner`, `wasm2es6js`)
```

## make build

```bash
cargo build --target wasm32-unknown-unknown

wasm-bindgen --target deno --out-dir pkg ./target/wasm32-unknown-unknown/debug/deno_wasm.wasm
```

## make run

```bash
deno run --allow-read deno.ts
```

## make test

Cargo test must use special target and the `wasm-bindgen-test-runner` (see makefile):

```rust
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_hello_world() {
    assert_eq!(hello_world(), "Hello World!".to_string());
}
```

## References

- [Deno WebAssembly](https://deno.land/manual/getting_started/webassembly)
- [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/) (Deno target [pull request](https://github.com/rustwasm/wasm-bindgen/pull/2176/files))
