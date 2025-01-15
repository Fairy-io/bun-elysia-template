import { Elysia } from 'elysia';
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

        .use(CardsController);
};
