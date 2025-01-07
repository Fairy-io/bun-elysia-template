import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { config } from './config';
import { onError } from './onError';
import { CardsController } from './controllers';
import { provide } from './utils/di';
import { CardsProvider } from './providers';

export type DiStore = {
    CardsProvider: CardsProvider;
};

export const createApp = (di: Partial<DiStore> = {}) => {
    const defaultDiStore: DiStore = {
        CardsProvider: new CardsProvider(),
    };

    provide({ ...defaultDiStore, ...di });

    return new Elysia()
        .use(onError)
        .use(
            swagger({
                documentation: {
                    info: {
                        title: config.SERVICE_NAME,
                        version: config.SERVICE_VERSION,
                        description:
                            config.SERVICE_DESCRIPTION,
                    },
                    components: {
                        securitySchemes: {
                            userRole: {
                                type: 'apiKey',
                                name: 'user-role',
                                in: 'header',
                            },
                        },
                    },
                },
                path: '/docs',
            }),
        )
        .use(CardsController);
};
