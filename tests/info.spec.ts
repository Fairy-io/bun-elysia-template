import {
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
} from 'bun:test';
import { createApp } from '../src/createApp';
import { ConfigProviderMock } from './mocks/config.provider';

describe('GET /info', () => {
    let app: ReturnType<typeof createApp>;
    let configProvider: ConfigProviderMock;

    beforeAll(() => {
        configProvider = new ConfigProviderMock();

        app = createApp({ ConfigProvider: configProvider });
    });

    afterEach(() => {
        configProvider.getConfig.mockReset();
    });

    it('returns environment variable', async () => {
        configProvider.getConfig.mockReturnValue(
            Promise.resolve({ SERVICE_ENV: 'test' }),
        );

        const { response, status } = await app
            .handle(
                new Request('http://localhost/info', {
                    method: 'get',
                }),
            )
            .then(async (res) => ({
                response: await res.json(),
                status: res.status,
            }));

        expect(response).toEqual({
            environment: 'test',
        });

        expect(status).toBe(200);

        expect(configProvider.getConfig).toHaveBeenCalled();
    });
});
