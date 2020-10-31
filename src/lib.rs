mod common;

use wasm_bindgen::prelude::*;
use common::process;

#[wasm_bindgen]
pub fn hello_world() -> String {
    "Hello World!".to_string()
}

#[wasm_bindgen]
pub fn hello_world_js() -> JsValue {
    JsValue::from("Hello World!")
}

#[wasm_bindgen]
pub fn process_js(input_fname: &str, output_fname: &str) -> Result<(), JsValue> {
    match process(input_fname, output_fname) {
        Ok(ok) => Ok(ok),
        Err(str) => Err(str.into()),
    }
}

use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_hello_world() {
    assert_eq!(hello_world(), "Hello World!".to_string());
}

#[wasm_bindgen_test]
fn test_hello_world_js() {
    assert_eq!(hello_world_js(), JsValue::from("Hello World!"));
}
