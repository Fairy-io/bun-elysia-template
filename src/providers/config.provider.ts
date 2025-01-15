import { t } from 'elysia';
import { parseIntObject } from '../utils/parseIntObject';
import { validateObject } from '../utils/validateObject';

const configSchema = t.Object({
    SERVICE_ENV: t.String(),
    PORT: t.Optional(t.Numeric()),
    SERVICE_NAME: t.Optional(t.String()),
    SERVICE_VERSION: t.Optional(t.String()),
    SERVICE_DESCRIPTION: t.Optional(t.String()),
});

type Config = Required<typeof configSchema.static>;

export interface ConfigProviderInterface {
    getConfig(): Promise<Config>;
}

export class ConfigProvider
    implements ConfigProviderInterface
{
    async getConfig(): Promise<Config> {
        const config = validateObject(
            parseIntObject({
                ...process.env,
                SERVICE_VERSION: process.env.SERVICE_VERSION
                    ? `ver. ${process.env.SERVICE_VERSION}`
                    : undefined,
            }),
            configSchema,
        );

        return {
            PORT: config.PORT || 3000,

            SERVICE_ENV: config.SERVICE_ENV,

            SERVICE_NAME: this.parseServiceName(
                config.SERVICE_NAME || 'API',
            ),

            SERVICE_VERSION:
                config.SERVICE_VERSION || 'ver. 0.0.0',

            SERVICE_DESCRIPTION:
                config.SERVICE_DESCRIPTION || 'Awesome API',
        };
    }

    private parseServiceName(serviceName: string) {
        return serviceName
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }
}
