import { t } from 'elysia';
import { validateObject } from '../utils/validateObject';
import { parseIntObject } from '../utils/parseIntObject';

const configSchema = t.Object({
    PORT: t.Optional(t.Numeric()),
    DOCUMENTATION_TITLE: t.Optional(t.String()),
    DOCUMENTATION_VERSION: t.Optional(t.String()),
    DOCUMENTATION_DESCRIPTION: t.Optional(t.String()),
});

const optionalConfig = validateObject(
    parseIntObject({
        ...process.env,
        DOCUMENTATION_VERSION: process.env
            .DOCUMENTATION_VERSION
            ? `ver. ${process.env.DOCUMENTATION_VERSION}`
            : undefined,
    }),
    configSchema,
);

export const config: Required<typeof optionalConfig> = {
    PORT: 3000,
    DOCUMENTATION_TITLE: 'API',
    DOCUMENTATION_DESCRIPTION: 'Awesome API',
    ...optionalConfig,
    DOCUMENTATION_VERSION:
        optionalConfig.DOCUMENTATION_VERSION ||
        'ver. 0.0.0',
};
