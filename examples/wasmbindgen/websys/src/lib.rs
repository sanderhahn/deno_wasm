use wasm_bindgen::prelude::*;
use js_sys::JsString;

#[wasm_bindgen(js_name = "helloConsole")]
pub fn hello_console() -> () {
    let hello: JsString = "Hello world".into();
    let args = js_sys::Array::new();
    args.push(&hello);
    web_sys::console::log(&args);
}
