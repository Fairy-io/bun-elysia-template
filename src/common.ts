/**
 * This is common Elysia configuration which can be used for all controllers
 */

import Elysia from 'elysia';
import { VoidModel } from './models/api/response';
import { inject } from './utils/di';

export const ElysiaCommon = new Elysia({
    name: 'common',
})
    .model('void', VoidModel)

    .decorate('inject', inject);
