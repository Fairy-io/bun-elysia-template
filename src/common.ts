/**
 * This is common Elysia configuration which can be used for all controllers
 */

import Elysia from 'elysia';
import {
    InvalidPayloadSchema,
    UnauthorizedSchema,
    VoidSchema,
} from './models/api/response';
import { auth } from './auth';
import { di } from './plugins/di';

export const ElysiaCommon = new Elysia({
    name: 'common',
})
    .model('Void', VoidSchema)
    .model('InvalidPayload', InvalidPayloadSchema)
    .model('Unauthorized', UnauthorizedSchema)

    .use(di())
    .use(auth);
