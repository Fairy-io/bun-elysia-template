import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { config } from './config';
import { CardsController } from './controllers';
import { provide } from './utils/di';

export type DiStore = {};

export const createApp = (di: Partial<DiStore> = {}) => {
    const defaultDiStore: DiStore = {};

    provide({ ...defaultDiStore, ...di });

    return new Elysia()
        .use(
            swagger({
                documentation: {
                    info: {
                        title: config.DOCUMENTATION_TITLE,
                        version:
                            config.DOCUMENTATION_VERSION,
                        description:
                            config.DOCUMENTATION_DESCRIPTION,
                    },
                },
                path: '/docs',
            }),
        )
        .use(CardsController);
};
