import { Elysia } from 'elysia';
import { Unauthorized } from './models/api/response';
import { di } from './plugins/di';

export const auth = new Elysia({ name: 'auth' })
    .use(di())

    .macro(({ onBeforeHandle }) => ({
        auth(userRole: string) {
            onBeforeHandle(
                async ({ headers, error: send }) => {
                    const role = headers['user-role'];

                    if (userRole !== role) {
                        const error: Unauthorized = {
                            error: true,
                            code: 'INSUFFICIENT_PRIVILEGES',
                        };

                        return send('Unauthorized', error);
                    }
                },
            );
        },
    }));
