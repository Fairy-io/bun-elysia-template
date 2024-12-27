import { config } from './config';
import { createApp } from './createApp';

const app = createApp();

app.listen(config.PORT);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
