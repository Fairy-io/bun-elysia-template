import { t } from 'elysia';
import { validateObject } from '../utils/validateObject';
import { parseIntObject } from '../utils/parseIntObject';

const configSchema = t.Object({
    PORT: t.Optional(t.Numeric()),
    SERVICE_NAME: t.Optional(t.String()),
    SERVICE_VERSION: t.Optional(t.String()),
    SERVICE_DESCRIPTION: t.Optional(t.String()),
});

const optionalConfig = validateObject(
    parseIntObject({
        ...process.env,
        SERVICE_VERSION: process.env.SERVICE_VERSION
            ? `ver. ${process.env.SERVICE_VERSION}`
            : undefined,
    }),
    configSchema,
);

const parseServiceName = (serviceName: string) => {
    return serviceName
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const config: Required<typeof optionalConfig> = {
    PORT: optionalConfig.PORT || 3000,

    SERVICE_NAME: parseServiceName(
        optionalConfig.SERVICE_NAME || 'API',
    ),

    SERVICE_DESCRIPTION:
        optionalConfig.SERVICE_DESCRIPTION || 'Awesome API',

    SERVICE_VERSION:
        optionalConfig.SERVICE_VERSION || 'ver. 0.0.0',
};
