FROM oven/bun as prod_dependencies

WORKDIR /workspace

COPY package.json .
COPY bun.lockb .

RUN ["bun", "install", "--production"]

FROM prod_dependencies

RUN ["bun", "install"]
