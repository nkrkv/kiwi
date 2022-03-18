FROM python:3.10-slim as base

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
# No *.pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# Enable Python tracebacks on segfaults
ENV PYTHONFAULTHANDLER 1

#=======================================================================
# Dependencies installer
#=======================================================================
FROM base AS python-deps

# Install pipenv and compilation dependencies
RUN pip install pipenv
RUN apt-get update && \
      apt-get install -y --no-install-recommends gcc python-dev libpq-dev

# Install python dependencies in /.venv
COPY Pipfile .
COPY Pipfile.lock .
RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

#=======================================================================
# Production image
#=======================================================================
FROM base AS runtime

# Install runtime dependencies
RUN apt-get update && \
      apt-get install -y --no-install-recommends libpq5

# Copy virtual env from python-deps stage
COPY --from=python-deps /.venv /.venv
ENV PATH="/.venv/bin:$PATH"

# Create and switch to a new user
RUN useradd --create-home kiwi
WORKDIR /home/kiwi
USER kiwi

# Install application into container
COPY . .

# Expose HTTP API
EXPOSE 8100

# Run the application
ENTRYPOINT ["uvicorn", "kiwi.server:app"]
CMD ["--host", "0.0.0.0", "--port", "8100"]
