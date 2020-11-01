
import Context from "https://deno.land/std@0.76.0/wasi/snapshot_preview1.ts";
const context = new Context({
  args: Deno.args,
  env: Deno.env.toObject(),
  memory: new WebAssembly.Memory({ initial: 10 }),
  preopens: {
    ".": ".",
  },
});
const exports = context.exports;
export const args_get = exports.args_get;
export const args_sizes_get = exports.args_sizes_get;
export const environ_get = exports.environ_get;
export const environ_sizes_get = exports.environ_sizes_get;
export const clock_res_get = exports.clock_res_get;
export const clock_time_get = exports.clock_time_get;
export const fd_advise = exports.fd_advise;
export const fd_allocate = exports.fd_allocate;
export const fd_close = exports.fd_close;
export const fd_datasync = exports.fd_datasync;
export const fd_fdstat_get = exports.fd_fdstat_get;
export const fd_fdstat_set_flags = exports.fd_fdstat_set_flags;
export const fd_fdstat_set_rights = exports.fd_fdstat_set_rights;
export const fd_filestat_get = exports.fd_filestat_get;
export const fd_filestat_set_size = exports.fd_filestat_set_size;
export const fd_filestat_set_times = exports.fd_filestat_set_times;
export const fd_pread = exports.fd_pread;
export const fd_prestat_get = exports.fd_prestat_get;
export const fd_prestat_dir_name = exports.fd_prestat_dir_name;
export const fd_pwrite = exports.fd_pwrite;
export const fd_read = exports.fd_read;
export const fd_readdir = exports.fd_readdir;
export const fd_renumber = exports.fd_renumber;
export const fd_seek = exports.fd_seek;
export const fd_sync = exports.fd_sync;
export const fd_tell = exports.fd_tell;
export const fd_write = exports.fd_write;
export const path_create_directory = exports.path_create_directory;
export const path_filestat_get = exports.path_filestat_get;
export const path_filestat_set_times = exports.path_filestat_set_times;
export const path_link = exports.path_link;
export const path_open = exports.path_open;
export const path_readlink = exports.path_readlink;
export const path_remove_directory = exports.path_remove_directory;
export const path_rename = exports.path_rename;
export const path_symlink = exports.path_symlink;
export const path_unlink_file = exports.path_unlink_file;
export const poll_oneoff = exports.poll_oneoff;
export const proc_exit = exports.proc_exit;
export const proc_raise = exports.proc_raise;
export const sched_yield = exports.sched_yield;
export const random_get = exports.random_get;
export const sock_recv = exports.sock_recv;
export const sock_send = exports.sock_send;
export const sock_shutdown = exports.sock_shutdown;
export function init({
  _start,
  _initialize,
  memory,
}) {
  console.log("using memory", memory);
  context.memory = memory;
  if (_start instanceof Function) {
    _start();
    console.log("_start");
  } else if (_initialize instanceof Function) {
    _initialize();
    console.log("_initialize");
  } else {
    throw new Error(
      "No '_start' or '_initialize' entry point found in WebAssembly module, make sure to compile with wasm32-wasi as the target.",
    );
  }
}
