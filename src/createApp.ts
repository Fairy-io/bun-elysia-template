import { Elysia } from 'elysia';
import { onError } from './onError';
import {
    CardsController,
    InfoController,
} from './controllers';
import {
    CardsProvider,
    ConfigProvider,
    ConfigProviderInterface,
} from './providers';
import { di } from './plugins/di';

export type DiStore = {
    CardsProvider: CardsProvider;
    ConfigProvider: ConfigProviderInterface;
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

        .use(CardsController)
        .use(InfoController);
};
