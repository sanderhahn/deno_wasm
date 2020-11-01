mod common;

use wasm_bindgen::prelude::*;
use common::process;
use wasi;

// https://engineering.linecorp.com/en/blog/adding-experimental-webassembly-support-to-decaton-part-1/
#[no_mangle]
pub unsafe extern "C" fn _initialize() {
    println!("_initialize");
    let mut fd = 3;
    while let Ok(stat) = wasi::fd_prestat_get(fd) {
        match stat.tag {
            wasi::PREOPENTYPE_DIR => {
                let prefix_len = stat.u.dir.pr_name_len;
                let mut prefix = vec![0; prefix_len + 1];
                wasi::fd_prestat_dir_name(fd, prefix.as_mut_ptr(), prefix_len).unwrap();
                prefix[prefix_len] = '\0' as u8;
                // libc::__wasilibc_register_preopened_fd(
                //     fd as i32,
                //     Box::into_raw(prefix.into_boxed_slice()) as *const i8,
                // );
                println!("libc::__wasilibc_register_preopened_fd fd {} prefix {:?}", fd, prefix);
            }
            _ => break,
        }
        fd += 1;
    }
}

// __wasilibc_register_preopened_fd
// https://github.com/WebAssembly/wasi-libc/blob/84c0778bff35bca3b5fa7814a3e1f3fb36362af6/libc-bottom-half/sources/preopens.c#L111

// Register the given pre-opened file descriptor under the given path.
// __wasilibc_register_preopened_fd
// https://github.com/WebAssembly/wasi-libc/blob/84c0778bff35bca3b5fa7814a3e1f3fb36362af6/libc-bottom-half/sources/preopens.c#L77

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

#[wasm_bindgen]
pub fn args() -> String {
    let args: Vec<String> = std::env::args().collect();
    let result = args.join(", ");
    dbg!(&result);
    result
}

#[wasm_bindgen]
pub fn envs() -> String {
    let vars: Vec<String> = std::env::vars().map(|(key, value)| { format!("{} = {}", key, value) }).collect();
    vars.join("\n")
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
