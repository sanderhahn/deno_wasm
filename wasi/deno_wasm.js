

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_24(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hcf4cc27b52f848e3(arg0, arg1, addHeapObject(arg2));
}

/**
* @returns {string}
*/
export function hello_world() {
    try {
        const retptr = wasm.__wbindgen_export_4.value - 16;
        wasm.__wbindgen_export_4.value = retptr;
        wasm.hello_world(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_export_4.value += 16;
        wasm.__wbindgen_free(r0, r1);
    }
}

/**
* @returns {any}
*/
export function hello_world_js() {
    var ret = wasm.hello_world_js();
    return takeObject(ret);
}

/**
* @param {string} input_fname
* @param {string} output_fname
*/
export function process_js(input_fname, output_fname) {
    var ptr0 = passStringToWasm0(input_fname, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(output_fname, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.process_js(ptr0, len0, ptr1, len1);
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* Handler for `console.log` invocations.
*
* If a test is currently running it takes the `args` array and stringifies
* it and appends it to the current output of the test. Otherwise it passes
* the arguments to the original `console.log` function, psased as
* `original`.
* @param {Array<any>} args
*/
export function __wbgtest_console_log(args) {
    try {
        wasm.__wbgtest_console_log(addBorrowedObject(args));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* Handler for `console.debug` invocations. See above.
* @param {Array<any>} args
*/
export function __wbgtest_console_debug(args) {
    try {
        wasm.__wbgtest_console_debug(addBorrowedObject(args));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* Handler for `console.info` invocations. See above.
* @param {Array<any>} args
*/
export function __wbgtest_console_info(args) {
    try {
        wasm.__wbgtest_console_info(addBorrowedObject(args));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* Handler for `console.warn` invocations. See above.
* @param {Array<any>} args
*/
export function __wbgtest_console_warn(args) {
    try {
        wasm.__wbgtest_console_warn(addBorrowedObject(args));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* Handler for `console.error` invocations. See above.
* @param {Array<any>} args
*/
export function __wbgtest_console_error(args) {
    try {
        wasm.__wbgtest_console_error(addBorrowedObject(args));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

function __wbg_adapter_40(arg0, arg1) {
    wasm.wasm_bindgen__convert__closures__invoke0_mut__h5625740d2f04e238(arg0, arg1);
}

function handleError(f) {
    return function () {
        try {
            return f.apply(this, arguments);

        } catch (e) {
            wasm.__wbindgen_exn_store(addHeapObject(e));
        }
    };
}
function __wbg_adapter_57(arg0, arg1, arg2, arg3, arg4) {
    wasm.wasm_bindgen__convert__closures__invoke3_mut__hcd01f8ce87e031f2(arg0, arg1, addHeapObject(arg2), arg3, addHeapObject(arg4));
}

function __wbg_adapter_70(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h8c19aee2b772dab5(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* Runtime test harness support instantiated in JS.
*
* The node.js entry script instantiates a `Context` here which is used to
* drive test execution.
*/
export class WasmBindgenTestContext {

    static __wrap(ptr) {
        const obj = Object.create(WasmBindgenTestContext.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_wasmbindgentestcontext_free(ptr);
    }
    /**
    * Creates a new context ready to run tests.
    *
    * A `Context` is the main structure through which test execution is
    * coordinated, and this will collect output and results for all executed
    * tests.
    */
    constructor() {
        var ret = wasm.wasmbindgentestcontext_new();
        return WasmBindgenTestContext.__wrap(ret);
    }
    /**
    * Inform this context about runtime arguments passed to the test
    * harness.
    *
    * Eventually this will be used to support flags, but for now it's just
    * used to support test filters.
    * @param {any[]} args
    */
    args(args) {
        var ptr0 = passArrayJsValueToWasm0(args, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.wasmbindgentestcontext_args(this.ptr, ptr0, len0);
    }
    /**
    * Executes a list of tests, returning a promise representing their
    * eventual completion.
    *
    * This is the main entry point for executing tests. All the tests passed
    * in are the JS `Function` object that was plucked off the
    * `WebAssembly.Instance` exports list.
    *
    * The promise returned resolves to either `true` if all tests passed or
    * `false` if at least one test failed.
    * @param {any[]} tests
    * @returns {Promise<any>}
    */
    run(tests) {
        var ptr0 = passArrayJsValueToWasm0(tests, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.wasmbindgentestcontext_run(this.ptr, ptr0, len0);
        return takeObject(ret);
    }
}

const imports = {
    __wbindgen_placeholder__: {
        __wbindgen_string_new: function(arg0, arg1) {
            var ret = getStringFromWasm0(arg0, arg1);
            return addHeapObject(ret);
        },
        __wbindgen_jsval_eq: function(arg0, arg1) {
            var ret = getObject(arg0) === getObject(arg1);
            return ret;
        },
        __wbg_log_34d125773bf9a5f0: function(arg0, arg1) {
            console.log(getStringFromWasm0(arg0, arg1));
        },
        __wbg_String_5bccacde55fd16f6: function(arg0, arg1) {
            var ret = String(getObject(arg1));
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbg_wbgtestinvoke_7ac785624d2c2956: handleError(function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = () => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_40(a, state0.b, );
                    } finally {
                        state0.a = a;
                    }
                };
                __wbg_test_invoke(cb0);
            } finally {
                state0.a = state0.b = 0;
            }
        }),
        __wbg_static_accessor_document_32bd89596daa71ea: function() {
            var ret = document;
            return addHeapObject(ret);
        },
        __wbg_getElementById_d80f17130e5ee274: function(arg0, arg1, arg2) {
            var ret = getObject(arg0).getElementById(getStringFromWasm0(arg1, arg2));
            return addHeapObject(ret);
        },
        __wbg_textcontent_808251588c50f46c: function(arg0, arg1) {
            var ret = getObject(arg1).textContent;
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbg_settextcontent_237bb24d1b33ace6: function(arg0, arg1, arg2) {
            getObject(arg0).textContent = getStringFromWasm0(arg1, arg2);
        },
        __wbg_stack_2183fe4045421c1d: function(arg0) {
            var ret = getObject(arg0).stack;
            return addHeapObject(ret);
        },
        __wbindgen_number_new: function(arg0) {
            var ret = arg0;
            return addHeapObject(ret);
        },
        __wbindgen_object_clone_ref: function(arg0) {
            var ret = getObject(arg0);
            return addHeapObject(ret);
        },
        __wbg_self_37061ee43ab7f049: function(arg0) {
            var ret = getObject(arg0).self;
            return addHeapObject(ret);
        },
        __wbg_stack_8184c2bac52beedb: function(arg0, arg1) {
            var ret = getObject(arg1).stack;
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbindgen_cb_drop: function(arg0) {
            const obj = takeObject(arg0).original;
            if (obj.cnt-- == 1) {
                obj.a = 0;
                return true;
            }
            var ret = false;
            return ret;
        },
        __wbg_forEach_e8150d9b57b1318e: function(arg0, arg1, arg2) {
            try {
                var state0 = {a: arg1, b: arg2};
                var cb0 = (arg0, arg1, arg2) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_57(a, state0.b, arg0, arg1, arg2);
                    } finally {
                        state0.a = a;
                    }
                };
                getObject(arg0).forEach(cb0);
            } finally {
                state0.a = state0.b = 0;
            }
        },
        __wbg_message_648d5860715944a3: function(arg0) {
            var ret = getObject(arg0).message;
            return addHeapObject(ret);
        },
        __wbg_name_a08ace2acd4dd302: function(arg0) {
            var ret = getObject(arg0).name;
            return addHeapObject(ret);
        },
        __wbg_newnoargs_f3b8a801d5d4b079: function(arg0, arg1) {
            var ret = new Function(getStringFromWasm0(arg0, arg1));
            return addHeapObject(ret);
        },
        __wbg_call_8e95613cc6524977: handleError(function(arg0, arg1) {
            var ret = getObject(arg0).call(getObject(arg1));
            return addHeapObject(ret);
        }),
        __wbg_call_d713ea0274dfc6d2: handleError(function(arg0, arg1, arg2) {
            var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
            return addHeapObject(ret);
        }),
        __wbg_new_d0c63652ab4d825c: function(arg0, arg1) {
            try {
                var state0 = {a: arg0, b: arg1};
                var cb0 = (arg0, arg1) => {
                    const a = state0.a;
                    state0.a = 0;
                    try {
                        return __wbg_adapter_70(a, state0.b, arg0, arg1);
                    } finally {
                        state0.a = a;
                    }
                };
                var ret = new Promise(cb0);
                return addHeapObject(ret);
            } finally {
                state0.a = state0.b = 0;
            }
        },
        __wbg_resolve_2529512c3bb73938: function(arg0) {
            var ret = Promise.resolve(getObject(arg0));
            return addHeapObject(ret);
        },
        __wbg_then_4a7a614abbbe6d81: function(arg0, arg1) {
            var ret = getObject(arg0).then(getObject(arg1));
            return addHeapObject(ret);
        },
        __wbg_globalThis_b9277fc37e201fe5: handleError(function() {
            var ret = globalThis.globalThis;
            return addHeapObject(ret);
        }),
        __wbg_self_07b2f89e82ceb76d: handleError(function() {
            var ret = self.self;
            return addHeapObject(ret);
        }),
        __wbg_window_ba85d88572adc0dc: handleError(function() {
            var ret = window.window;
            return addHeapObject(ret);
        }),
        __wbg_global_e16303fe83e1d57f: handleError(function() {
            var ret = global.global;
            return addHeapObject(ret);
        }),
        __wbindgen_is_undefined: function(arg0) {
            var ret = getObject(arg0) === undefined;
            return ret;
        },
        __wbindgen_object_drop_ref: function(arg0) {
            takeObject(arg0);
        },
        __wbg_error_4bb6c2a97407129a: function(arg0, arg1) {
            try {
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(arg0, arg1);
            }
        },
        __wbg_new_59cb74e423758ede: function() {
            var ret = new Error();
            return addHeapObject(ret);
        },
        __wbg_stack_558ba5917b466edd: function(arg0, arg1) {
            var ret = getObject(arg1).stack;
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbindgen_string_get: function(arg0, arg1) {
            const obj = getObject(arg1);
            var ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbindgen_debug_string: function(arg0, arg1) {
            var ret = debugString(getObject(arg1));
            var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            getInt32Memory0()[arg0 / 4 + 1] = len0;
            getInt32Memory0()[arg0 / 4 + 0] = ptr0;
        },
        __wbindgen_throw: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbindgen_rethrow: function(arg0) {
            throw takeObject(arg0);
        },
        __wbindgen_closure_wrapper1284: function(arg0, arg1, arg2) {
            var ret = makeMutClosure(arg0, arg1, 71, __wbg_adapter_24);
            return addHeapObject(ret);
        },
    },

};

import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";

const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
});

const file = new URL(import.meta.url).pathname;
console.log(file);
const wasmFile = file.substring(0, file.lastIndexOf(Deno.build.os === 'windows' ? '\\' : '/') + 1) + 'deno_wasm_bg.wasm';
const wasmModule = new WebAssembly.Module(Deno.readFileSync(wasmFile));
const wasmInstance = new WebAssembly.Instance(wasmModule, {
  ...imports,
  "wasi_snapshot_preview1": context.exports,
});
const wasm = wasmInstance.exports;
