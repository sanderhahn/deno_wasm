use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn hello_world() -> String {
  "Hello World!".to_string()
}

#[cfg(test)]
mod tests {
    use wasm_bindgen_test::*;
    use crate::hello_world;

    #[wasm_bindgen_test]
    fn test_hello_world() {
        assert_eq!(hello_world(), "Hello World!".to_string());
    }
}
