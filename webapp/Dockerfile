FROM node:16.14 AS builder

WORKDIR /srv

COPY pages pages
COPY public public
COPY src src
COPY package.json yarn.lock Makefile ./

# Install only production deps...
RUN yarn install \
  --production \
  --frozen-lockfile \
  --non-interactive;

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL $NEXT_PUBLIC_API_BASE_URL
RUN make build

#======================================================================
# Production container image
#======================================================================
FROM node:16.14-slim

ENV NODE_ENV=production

# Create and switch to a new user
RUN useradd --create-home kiwi
WORKDIR /home/kiwi
USER kiwi

COPY --from=builder /srv .

EXPOSE 8300
ENTRYPOINT [ "yarn", "next", "start" ]
CMD [ "--port", "8300" ]
