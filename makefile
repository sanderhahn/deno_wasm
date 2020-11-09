test:
	$(MAKE) -C examples/wasmbindgen/mylib test
	$(MAKE) -C examples/wasi/mybin test
	$(MAKE) -C examples/wasi-wasmbindgen/mybin test

clean:
	$(MAKE) -C examples/wasmbindgen/mylib clean
	$(MAKE) -C examples/wasi/mybin clean
	$(MAKE) -C examples/wasi-wasmbindgen/mybin clean
