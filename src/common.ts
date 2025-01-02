/**
 * This is common Elysia configuration which can be used for all controllers
 */

import Elysia from 'elysia';
import {
    InvalidPayloadSchema,
    VoidSchema,
} from './models/api/response';
import { inject } from './utils/di';

export const ElysiaCommon = new Elysia({
    name: 'common',
})
    .model('Void', VoidSchema)
    .model('InvalidPayload', InvalidPayloadSchema)

    .decorate('inject', inject);
