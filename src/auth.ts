import { Elysia } from 'elysia';
import { Unauthorized } from './models/api/response';
import { inject } from './utils/di';

export const auth = new Elysia({ name: 'auth' })
    .decorate('inject', inject)

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
