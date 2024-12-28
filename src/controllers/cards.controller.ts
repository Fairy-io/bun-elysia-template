import Elysia, { t } from 'elysia';
import { ElysiaCommon } from '../common';
import { CardDto } from '../models/api/dto';
import {
    CardModel,
    NotFoundErrorModel,
} from '../models/api/response';

const CardsModel = t.Array(CardModel);
const CardNotFound = NotFoundErrorModel('card');

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
    .model('CardNotFound', CardNotFound)

    .get(
        '',
        async ({ error: send, inject }) => {
            const cardsProvider = inject('CardsProvider');

            const cards = await cardsProvider.fetchCards();

            return send('OK', cards);
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
        async ({ error: send, inject, params: { id } }) => {
            const cardsProvider = inject('CardsProvider');

            const card = await cardsProvider.getCardById(
                id,
            );

            if (!card) {
                return send('Not Found', {
                    error: true,
                    code: 'NOT_FOUND',
                    details: { id, type: 'card' },
                });
            }

            return send('OK', card);
        },
        {
            detail: { description: 'Get card by id' },
            params: t.Object({ id: t.String() }),
            response: { 200: 'Card', 404: 'CardNotFound' },
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
