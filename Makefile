
.PHONY: dev
dev:
	pipenv run uvicorn kiwi.server:app --port 8100 --reload
