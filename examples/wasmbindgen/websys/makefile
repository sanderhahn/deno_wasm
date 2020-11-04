build: src/lib.rs
	cargo build --target wasm32-unknown-unknown
	wasm-bindgen --target web --out-dir pkg ./target/wasm32-unknown-unknown/debug/weblib.wasm

web:
	xdg-open http://localhost:8080/ &
	caddy file-server --listen :8080
