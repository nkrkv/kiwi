
.PHONY: dev_server
dev_server:
	$(MAKE) --directory=server dev

.PHONY: dev_webapp
dev_webapp:
	$(MAKE) --directory=webapp dev

.PHONY: prettify
prettify:
	$(MAKE) --directory=server prettify
	$(MAKE) --directory=webapp prettify

.PHONY: install_deps
install_deps:
	$(MAKE) --directory=server install_deps
	$(MAKE) --directory=webapp install_deps
