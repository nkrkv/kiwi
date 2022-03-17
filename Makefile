
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
