build: src/lib.rs
	cargo build --target wasm32-unknown-unknown
	wasm-bindgen --target deno --out-dir pkg ./target/wasm32-unknown-unknown/debug/mylib.wasm

run: build
	deno run --allow-read myscript.ts

test: build
	CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUNNER=~/.cargo/bin/wasm-bindgen-test-runner cargo test --target wasm32-unknown-unknown

setup:
	rustup target add wasm32-unknown-unknown
	cargo install wasm-bindgen-cli --version 0.2.68
