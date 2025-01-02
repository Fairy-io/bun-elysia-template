import Elysia, { t } from 'elysia';
import { ElysiaCommon } from '../common';
import { CardDtoSchema } from '../models/api/dto';
import {
    CardSchema,
    NotFoundErrorSchema,
} from '../models/api/response';

const CardsSchema = t.Array(CardSchema);
const CardNotFoundSchema = NotFoundErrorSchema('card');

export const CardsController = new Elysia({
    prefix: '/cards',
    tags: ['Cards'],
})
    .use(ElysiaCommon)

    .model('CardDto', CardDtoSchema)
    .model('Card', CardSchema)
    .model('CardsList', CardsSchema)
    .model('CardNotFound', CardNotFoundSchema)

    .get(
        '',
        async ({ error: send, inject }) => {
            const cardsProvider = inject('CardsProvider');

            const cards = await cardsProvider.fetchAll();

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

            const card = await cardsProvider.getById(id);

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
        async ({ error: send, inject, body }) => {
            const cardsProvider = inject('CardsProvider');

            const card = await cardsProvider.create(body);

            return send('Created', card);
        },
        {
            detail: { description: 'Create card' },
            body: 'CardDto',
            response: {
                201: 'Card',
                400: 'InvalidPayload',
            },
        },
    )

    .put(
        ':id',
        async ({
            error: send,
            inject,
            params: { id },
            body,
        }) => {
            const cardsProvider = inject('CardsProvider');

            const existingCard =
                await cardsProvider.getById(id);

            if (!existingCard) {
                return send('Not Found', {
                    error: true,
                    code: 'NOT_FOUND',
                    details: { id, type: 'card' },
                });
            }

            const card = await cardsProvider.update(
                id,
                body,
            );

            return send('OK', card);
        },
        {
            detail: { description: 'Update card by id' },
            body: 'CardDto',
            params: t.Object({ id: t.String() }),
            response: {
                200: 'Card',
                400: 'InvalidPayload',
                404: 'CardNotFound',
            },
        },
    )

    .delete(
        ':id',
        async ({ error: send, inject, params: { id } }) => {
            const cardsProvider = inject('CardsProvider');

            await cardsProvider.delete(id);

            return send('No Content', 'No Content');
        },
        {
            detail: { description: 'Delete card by id' },
            params: t.Object({ id: t.String() }),
            response: {
                204: 'Void',
            },
        },
    );
