import Elysia, { t } from 'elysia';
import { ElysiaCommon } from '../common';
import { CardDto } from '../models/api/dto';
import { CardModel } from '../models/api/response';

const CardsModel = t.Array(CardModel);

const card: typeof CardModel.static = {
    id: '123',
    name: 'Name',
    power: 5,
    description: 'Description',
    created_at: new Date(),
    updated_at: new Date(),
};

export const CardsController = new Elysia({
    prefix: '/cards',
    tags: ['Cards'],
})
    .use(ElysiaCommon)

    .model('CardDto', CardDto)
    .model('Card', CardModel)
    .model('CardsList', CardsModel)

    .get(
        '',
        async ({ error: send }) => {
            return send('OK', [card]);
        },
        {
            detail: { description: 'Get all cards' },
            response: {
                200: 'CardsList',
            },
        },
    )

    .get(
        ':id',
        async ({ error: send }) => {
            return send('OK', card);
        },
        {
            detail: { description: 'Get card by id' },
            response: { 200: 'Card' },
        },
    )

    .post(
        '',
        async ({ error: send }) => {
            return send('Created', card);
        },
        {
            detail: { description: 'Create card' },
            body: 'CardDto',
            response: {
                201: 'Card',
            },
        },
    )

    .put(
        ':id',
        async ({ error: send }) => {
            return send('OK', card);
        },
        {
            detail: { description: 'Update card by id' },
            body: 'CardDto',
            response: {
                200: 'Card',
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
