/**
 * This is common Elysia configuration which can be used for all controllers
 */

import Elysia from 'elysia';
import {
    InvalidPayloadSchema,
    UnauthorizedSchema,
    VoidSchema,
} from './models/api/response';
import { inject } from './utils/di';
import { auth } from './auth';

export const ElysiaCommon = new Elysia({
    name: 'common',
})
    .model('Void', VoidSchema)
    .model('InvalidPayload', InvalidPayloadSchema)
    .model('Unauthorized', UnauthorizedSchema)

    .decorate('inject', inject)

    .use(auth);
