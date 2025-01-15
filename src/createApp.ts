import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { config } from './config';
import { onError } from './onError';
import { CardsController } from './controllers';
import { CardsProvider, ConfigProvider } from './providers';
import { di } from './plugins/di';

export type DiStore = {
    CardsProvider: CardsProvider;
    ConfigProvider: ConfigProvider;
};

export const createApp = (
    diStore: Partial<DiStore> = {},
) => {
    const defaultDiStore: DiStore = {
        CardsProvider: new CardsProvider(),
        ConfigProvider: new ConfigProvider(),
    };

    return new Elysia()
        .use(onError)
        .use(di({ ...defaultDiStore, ...diStore }))
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
