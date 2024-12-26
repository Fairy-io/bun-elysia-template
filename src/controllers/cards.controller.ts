import Elysia, { t } from 'elysia';
import { ElysiaCustomStatusResponse } from 'elysia/dist/error';
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
        async (): Promise<
            | typeof CardsModel.static
            | ElysiaCustomStatusResponse<any>
        > => {
            return [];
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
        async (): Promise<
            | typeof CardModel.static
            | ElysiaCustomStatusResponse<any>
        > => {
            return { name: '123' };
        },
        {
            detail: { description: 'Get card by id' },
            response: { 200: 'card' },
        },
    )

    .post(
        '',
        async ({
            set,
        }): Promise<
            | typeof CardModel.static
            | ElysiaCustomStatusResponse<any>
        > => {
            set.status = 201;

            return { name: '123' };
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
        async (): Promise<
            | typeof CardModel.static
            | ElysiaCustomStatusResponse<any>
        > => {
            return {
                name: '123',
            };
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
        async (): Promise<void | ElysiaCustomStatusResponse<any>> => {},
        {
            detail: { description: 'Delete card by id' },
            response: {
                204: 'void',
            },
        },
    );
