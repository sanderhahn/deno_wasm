build: src/lib.rs
	rustup target add wasm32-unknown-unknown
	cargo build --target wasm32-unknown-unknown
	wasm-bindgen --target deno --out-dir pkg ./target/wasm32-unknown-unknown/debug/deno_wasm.wasm

run: build
	deno run --allow-read deno.ts

test: build
	CARGO_TARGET_WASM32_UNKNOWN_UNKNOWN_RUNNER=~/.cargo/bin/wasm-bindgen-test-runner cargo test --target wasm32-unknown-unknown

wasi_build: src/lib.rs src/common.rs
	# https://bytecodealliance.github.io/cargo-wasi/wasm-bindgen.html
	# due to a bug in wasm-bindgen, it is currently necessary to build in release mode
	# cargo wasi build --release
	cargo build --target wasm32-wasi
	wasm-bindgen --target deno --out-dir wasi ./target/wasm32-wasi/debug/deno_wasm.wasm
	deno run --allow-write --unstable snapshot_preview1_generate.ts

wasi_run: wasi_build
	deno run -A --unstable --importmap=./import_map.json deno_wasi.ts xyz

wasmtime_run: wasi_build
	echo "Hello world" >test.txt
	wasmtime --dir=. target/wasm32-wasi/debug/wasi_bin.wasm test.txt copy.txt
