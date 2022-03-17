
.PHONY: dev
dev_server:
	DATABASE_URL="postgresql://kiwi@localhost:5432/kiwi" \
		pipenv run uvicorn kiwi.server:app --port 8100 --reload
