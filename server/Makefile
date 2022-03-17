
.PHONY: dev
dev:
	DATABASE_URL="postgresql://kiwi@localhost:5432/kiwi" \
		pipenv run uvicorn kiwi.server:app --port 8100 --reload

.PHONY: prettify
prettify:
	pipenv run black .
