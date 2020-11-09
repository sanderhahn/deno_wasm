build:
	cargo build --target wasm32-wasi
	wasm-bindgen --target deno --out-dir pkg ./target/wasm32-wasi/debug/mybin.wasm
	deno run --allow-read --allow-write --unstable wasi_gen.ts ./pkg/mybin.js

run: build
	deno run --allow-env --allow-read --allow-write --unstable --importmap import_map.json myscript.ts hello.txt copy.txt

setup:
	rustup target add wasm32-wasi

test: build
	deno test --allow-env --allow-read --allow-write --unstable --importmap import_map.json

clean:
	rm -Rf target pkg copy.txt
