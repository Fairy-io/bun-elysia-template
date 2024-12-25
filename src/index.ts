import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { config } from './config';
import { CardsController } from './controllers';

const app = new Elysia()
    .use(
        swagger({
            documentation: {
                info: {
                    title: config.DOCUMENTATION_TITLE,
                    version: config.DOCUMENTATION_VERSION,
                    description:
                        config.DOCUMENTATION_DESCRIPTION,
                },
            },
            path: '/docs',
        }),
    )
    .use(CardsController)
    .listen(config.PORT);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
