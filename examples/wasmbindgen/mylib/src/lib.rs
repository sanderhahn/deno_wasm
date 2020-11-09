use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = "helloWorld")]
pub fn hello_world() -> String {
    "Hello World!".to_string()
}

#[cfg(test)]
mod tests {
    use crate::hello_world;
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn test_hello_world() {
        assert_eq!(hello_world(), "Hello World!".to_string());
    }
}
