import Elysia from 'elysia';
import { ElysiaCommon } from '../common';

export const CardsController = new Elysia({
    prefix: '/cards',
})
    .use(ElysiaCommon)
    .get('', async () => 'cards', {
        detail: { description: 'Get all cards' },
    })
    .get(':id', async () => 'card', {
        detail: { description: 'Get card by id' },
    })
    .post('', async () => 'created card', {
        detail: { description: 'Create card' },
    })
    .put(':id', async () => 'updated card', {
        detail: { description: 'Update card by id' },
    })
    .delete(':id', async () => 'deleted card', {
        detail: { description: 'Delete card by id' },
    });
