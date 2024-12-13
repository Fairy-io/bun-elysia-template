FROM oven/bun as prod

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

COPY scripts .

CMD ["sleep", "infinity"]
