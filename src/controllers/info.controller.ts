import Elysia from 'elysia';
import { ElysiaCommon } from '../common';
import { InfoSchema } from '../models/api/response';

export const InfoController = new Elysia({
    prefix: '/info',
    tags: ['Info'],
})
    .use(ElysiaCommon)
    .model('Info', InfoSchema)

    .get(
        '',
        async ({ error: send, inject }) => {
            const configProvider = inject('ConfigProvider');

            const config = await configProvider.getConfig();

            return send('OK', {
                environment: config.SERVICE_ENV,
            });
        },
        {
            detail: {
                description: 'Get info about the API',
            },
            response: { 200: 'Info' },
        },
    );
