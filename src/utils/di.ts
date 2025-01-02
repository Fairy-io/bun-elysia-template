import { DiStore } from '../createApp';

const diStore: Partial<DiStore> = {};

export const inject = <T extends keyof DiStore>(
    key: T,
): DiStore[T] => {
    const value = diStore[key];

    if (!value) {
        throw new Error(
            `di: value for ${key} is not defined`,
        );
    }

    return value;
};

export const provide = (di: DiStore) => {
    (Object.keys(di) as Array<keyof typeof di>).forEach(
        (key) => {
            const value = di[key];

            if (value === undefined) {
                return;
            }

            diStore[key] = di[key];
        },
    );
};
