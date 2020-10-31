build: src/lib.rs
	rustup target add wasm32-unknown-unknown
	cargo build --target wasm32-unknown-unknown
	wasm-bindgen --target deno --out-dir pkg ./target/wasm32-unknown-unknown/debug/deno_wasm.wasm

run: build
	deno run --allow-read --unstable deno.ts

test: build
	CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUNNER=~/.cargo/bin/wasm-bindgen-test-runner cargo test --target wasm32-unknown-unknown

wasi_build: src/bin.rs
	cargo build --target wasm32-wasi

wasi_run: wasi_build
	echo "Hello world" >test.txt
	wasmtime --dir=. target/wasm32-wasi/debug/wasi_bin.wasm test.txt copy.txt
