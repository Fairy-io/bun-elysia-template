import { Elysia } from 'elysia';
import { DiStore } from '../createApp';

export const di = (di: Partial<DiStore> = {}) =>
    new Elysia({ name: 'di' }).decorate(
        'inject',
        <T extends keyof typeof di>(key: T): DiStore[T] => {
            const value = di[key];

            if (!value) {
                throw new Error(
                    `Dependency ${key} not found`,
                );
            }

            return value;
        },
    );
