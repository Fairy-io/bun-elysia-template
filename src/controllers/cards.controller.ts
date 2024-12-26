import Elysia, { t } from 'elysia';
import { ElysiaCommon } from '../common';
import { CardDto } from '../models/api/dto';
import { CardModel } from '../models/api/response';

const CardsModel = t.Array(CardModel);

export const CardsController = new Elysia({
    prefix: '/cards',
})
    .use(ElysiaCommon)

    .model('dto', CardDto)
    .model('card', CardModel)
    .model('cards', CardsModel)

    .get(
        '',
        async ({ error: send }) => {
            return send('OK', []);
        },
        {
            detail: { description: 'Get all cards' },
            response: {
                200: 'cards',
            },
        },
    )

    .get(
        ':id',
        async ({ error: send }) => {
            return send('OK', { name: '123' });
        },
        {
            detail: { description: 'Get card by id' },
            response: { 200: 'card' },
        },
    )

    .post(
        '',
        async ({ error: send }) => {
            return send('Created', { name: '123' });
        },
        {
            detail: { description: 'Create card' },
            body: 'dto',
            response: {
                201: 'card',
            },
        },
    )

    .put(
        ':id',
        async ({ error: send }) => {
            return send('OK', { name: '123' });
        },
        {
            detail: { description: 'Update card by id' },
            body: 'dto',
            response: {
                200: 'card',
            },
        },
    )

    .delete(
        ':id',
        async ({ error: send }) => {
            return send('No Content', 'No Content');
        },
        {
            detail: { description: 'Delete card by id' },
            response: {
                204: 'void',
            },
        },
    );
