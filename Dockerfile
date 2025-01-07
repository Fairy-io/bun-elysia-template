FROM oven/bun:1.1.38 as prod

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN ["bun", "install", "--production"]

COPY src src

CMD [ "bun", "src/index.ts" ]

EXPOSE 3000

# ------

FROM prod

WORKDIR /app

RUN ["bun", "install"]

COPY scripts scripts
COPY tests tests
COPY tests_e2e tests_e2e

CMD ["sleep", "infinity"]
