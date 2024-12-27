/**
 * This is common Elysia configuration which can be used for all controlelrs
 */

import Elysia from 'elysia';
import { VoidModel } from './models/api/response';

export const ElysiaCommon = new Elysia({
    name: 'common',
}).model('void', VoidModel);
