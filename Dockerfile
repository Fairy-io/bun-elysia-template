FROM elysia_prod_dependencies:latest

WORKDIR /workspace

COPY src src

CMD [ "bun", "src/index.ts" ]

EXPOSE 3000
