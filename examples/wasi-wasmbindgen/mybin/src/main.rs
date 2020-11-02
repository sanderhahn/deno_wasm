use wasm_bindgen::prelude::*;
use std::fs;
use std::io::{Read, Write};

#[wasm_bindgen]
pub fn process(input_fname: &str, output_fname: &str) -> Result<(), JsValue> {
    match internal_process(input_fname, output_fname) {
        Ok(ok) => Ok(ok),
        Err(str) => Err(str.into()),
    }
}

fn internal_process(input_fname: &str, output_fname: &str) -> Result<(), String> {
    let mut input_file =
        fs::File::open(input_fname).map_err(|err| format!("error opening input: {}", err))?;
    let mut contents = Vec::new();
    input_file
        .read_to_end(&mut contents)
        .map_err(|err| format!("read error: {}", err))?;

    let mut output_file = fs::File::create(output_fname)
        .map_err(|err| format!("error opening output '{}': {}", output_fname, err))?;
    output_file
        .write_all(&contents)
        .map_err(|err| format!("write error: {}", err))
}

fn main() {
    // kept empty but is required for initialization
}
